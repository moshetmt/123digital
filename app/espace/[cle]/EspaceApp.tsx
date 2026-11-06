'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ArrowDown, Bookmark, Bot, Check, ChevronDown, CircleAlert, Clock, ExternalLink, GitBranch, Hammer, Handshake, Lightbulb, ListChecks, MessageCircle,
  Moon, Newspaper, PackageX, Plus, Radar, RefreshCw, Signpost, Sparkles, Telescope, Trash2, Wallet, X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Chantier, Decision, Donnees, Idee, Opportunite, Robot } from '@/lib/espace'

/* Espace 123digital, version « un seul fil » (03/11/2026). Retour de Moshé sur la version à
   rubriques : « je capte pas trop, c'est mal foutu, je sais pas quoi faire dedans ». Un seul écran,
   comme une boîte de réception : en haut ce qui attend sa réponse (une question fermée par carte),
   au milieu le bilan de la nuit, en bas une barre fixe « Dire un truc à Claude ». Les anciennes
   vues (idées, opportunités, chantiers, répondu) restent derrière le lien « Autre ».
   Règle des outils de Moshé : icône et un mot, gros boutons, état visible, jamais de liste
   déroulante, jamais de jargon. Charte 123digital inchangée : cartes blanches ombrées à 32 px sur
   vert 100, boutons pilule. */

const CACHE = 'espace-123digital'
const BROUILLON = 'espace-123digital-brouillon'

const carte = 'rounded-[var(--radius)] bg-white p-5 shadow-[var(--ombre-carte)]'
const choix = 'btn-sans-fleche justify-center !text-[1rem] min-h-[48px] !px-5'
const action = '!text-[1rem] min-h-[48px] !px-6'
const reponse = 'btn-sans-fleche !w-full !whitespace-normal !justify-center !text-[1.05rem] min-h-[52px] !px-5 text-center'

function dateCourte(iso: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?/.exec(iso || '')
  if (!m) return ''
  return `${m[3]}/${m[2]}${m[4] ? ` à ${m[4]} h ${m[5]}` : ''}`
}
/* Date et heure de Paris au format du script Google (yyyy-MM-ddTHH:mm). */
function parisIso(d: Date) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris', hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
      .formatToParts(d).map((x) => [x.type, x.value]),
  )
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}`
}
/* Répondu, sauf « Plus tard » daté d'un autre jour de Paris : la carte revient le lendemain (décisions et chantiers). */
function aRepondu(x: { reponse?: string; reponduLe?: string; repondu_le?: string }) {
  if (!x.reponse) return false
  if (x.reponse !== 'plus-tard') return true
  const quand = (x.reponduLe || x.repondu_le || '').slice(0, 10)
  return !quand || quand === parisIso(new Date()).slice(0, 10)
}
const euros = (n: number) => n.toLocaleString('fr-FR') + ' €'
const QUAND: Record<string, string> = { semaine: 'Cette semaine', mois: 'Ce mois-ci', 'plus-tard': 'Plus tard' }
const nettoyer = (t: string) => t.replace(/\*\*|`/g, '').trim()

/* Les agents et veilles (09/11) : une décision leur appartient quand sa « Source : » les nomme, une idée
   quand la colonne « veille » du journal des trouvailles les nomme. Le pilote budget a sa place dans Robots. */
const AGENTS: { cle: string; nom: string; Icone: LucideIcon; source: RegExp }[] = [
  { cle: 'veille-metiers', nom: 'Veille métiers', Icone: Newspaper, source: /veille-metiers/i },
  { cle: 'veille-ia', nom: 'Veille IA', Icone: Sparkles, source: /veille-ia/i },
  { cle: 'github-quotidien', nom: 'GitHub', Icone: GitBranch, source: /github/i },
  { cle: 'concurrents', nom: 'Concurrents', Icone: Telescope, source: /concurren/i },
  { cle: 'ruptures', nom: 'Ruptures', Icone: PackageX, source: /rupture/i },
  { cle: 'bras-droit', nom: 'Bras droit', Icone: ListChecks, source: /bras[- ]droit/i },
]
const estPilote = (x: Decision) => /^pilote-/.test(x.id) || /\/pilote\//.test(x.source)
const agentDecision = (x: Decision) => (estPilote(x) ? null : (AGENTS.find((a) => a.source.test(x.source))?.cle ?? null))
const agentIdee = (i: Idee) => AGENTS.find((a) => a.cle === i.veille)?.cle ?? AGENTS.find((a) => a.source.test(i.source))?.cle ?? null
const ETAT_ROBOT: Record<string, { libelle: string; couleur: string }> = {
  vert: { libelle: 'Dans les clous', couleur: 'var(--brand)' },
  orange: { libelle: 'À surveiller', couleur: '#9A5B00' },
  rouge: { libelle: 'Au-dessus du budget', couleur: 'var(--alerte)' },
}
const nombre = (t: string) => parseFloat((t || '').replace(',', '.')) || 0
const pluriel = (n: number, un: string, plusieurs: string) => `${n} ${n > 1 ? plusieurs : un}`

type Carte =
  | { type: 'decision'; id: string; dec: Decision }
  | { type: 'chantier'; id: string; ch: Chantier }
type Autre = 'idees' | 'opportunites' | 'chantiers' | 'repondu'
type Reponse = Donnees & { ok: boolean; error?: string }

export function EspaceApp({ cle, demo }: { cle: string; demo: boolean }) {
  const [d, setD] = useState<Donnees | null>(null)
  const [etat, setEtat] = useState<'charge' | 'ok' | 'cle' | 'branchement' | 'reseau'>('charge')
  const [lent, setLent] = useState(false)
  const [toast, setToast] = useState('')
  const [sortantes, setSortantes] = useState<string[]>([])
  const [autreOuvert, setAutreOuvert] = useState(false)
  const [autre, setAutre] = useState<Autre>('idees')
  const [messageOuvert, setMessageOuvert] = useState(false)
  const [brouillon, setBrouillon] = useState('')
  const [envoi, setEnvoi] = useState(false)
  const [erreurMessage, setErreurMessage] = useState('')
  const [ouverts, setOuverts] = useState<string[]>([])
  const [marque, setMarque] = useState('')

  const occupe = useRef(new Set<string>()) // identifiants en cours d'envoi : un double appui n'écrit qu'une fois
  const enVol = useRef(0) // écritures en cours : une relecture ne doit pas défaire l'écran optimiste
  const minuterieToast = useRef<number | undefined>(undefined)
  const idMessage = useRef('')
  const messageEnCours = useRef(false)

  const appeler = useCallback(
    async (corps: Record<string, unknown>) => {
      const r = await fetch('/api/espace', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...corps, cle }),
        cache: 'no-store',
        signal: AbortSignal.timeout(25000),
      })
      return (await r.json()) as Reponse
    },
    [cle],
  )

  const charger = useCallback(async () => {
    setEtat('charge')
    try {
      const r = await appeler({ action: 'donnees' })
      if (r.ok) {
        if (enVol.current === 0) setD(r)
        setEtat('ok')
        if (!demo) localStorage.setItem(CACHE, JSON.stringify(r))
      } else setEtat(r.error === 'cle' ? 'cle' : r.error === 'branchement' ? 'branchement' : 'reseau')
    } catch {
      setEtat('reseau')
    }
  }, [appeler, demo])

  useEffect(() => {
    try {
      if (!demo) {
        const c = localStorage.getItem(CACHE)
        if (c) setD(JSON.parse(c))
      }
      const b = JSON.parse(localStorage.getItem(BROUILLON) || 'null')
      if (b && typeof b.texte === 'string') {
        setBrouillon(b.texte)
        idMessage.current = String(b.id || '')
      }
    } catch {}
    charger()
    const visible = () => document.visibilityState === 'visible' && charger()
    document.addEventListener('visibilitychange', visible)
    return () => document.removeEventListener('visibilitychange', visible)
  }, [charger, demo])

  useEffect(() => {
    setLent(false)
    if (etat !== 'charge') return
    const t = window.setTimeout(() => setLent(true), 6000)
    return () => window.clearTimeout(t)
  }, [etat])

  const dire = (t: string, ms = 3500) => {
    window.clearTimeout(minuterieToast.current)
    setToast(t)
    if (ms > 0) minuterieToast.current = window.setTimeout(() => setToast(''), ms)
  }

  /* Écriture optimiste : l'écran change tout de suite (appliquer), et revient (annuler) si l'envoi échoue.
     Les deux fonctions travaillent sur l'état courant, pas sur une copie vieillie. */
  const ecrire = async (
    corps: Record<string, unknown>,
    appliquer: (x: Donnees) => Donnees,
    annuler: (x: Donnees) => Donnees,
    merci: string,
  ) => {
    setD((p) => (p ? appliquer(p) : p))
    enVol.current += 1
    dire('Envoi…', 0)
    try {
      const r = await appeler(corps)
      if (!r.ok) throw new Error(r.error)
      dire(demo ? `${merci} (démonstration, rien d’envoyé)` : merci)
      return r
    } catch {
      setD((p) => (p ? annuler(p) : p))
      dire('Pas envoyé. Réessaie dans un instant.', 5000)
      return null
    } finally {
      enVol.current -= 1
    }
  }

  /* Une seule écriture par élément, même si le doigt tape deux fois. animer = la carte se replie avant l'envoi. */
  const traiter = (id: string, animer: boolean, fn: () => Promise<unknown>) => {
    if (occupe.current.has(id)) return
    occupe.current.add(id)
    if (animer) setSortantes((s) => [...s, id])
    window.setTimeout(async () => {
      try {
        await fn()
      } finally {
        occupe.current.delete(id)
        setSortantes((s) => s.filter((x) => x !== id))
      }
    }, animer ? 260 : 0)
  }

  const maintenant = () => parisIso(new Date())

  const repondre = (dec: Decision, lettre: string, animer = false) =>
    traiter(dec.id, animer, () =>
      ecrire(
        { action: 'repondre', id: dec.id, choix: lettre },
        (x) => ({ ...x, decisions: x.decisions.map((y) => (y.id === dec.id ? { ...y, reponse: lettre, reponduLe: maintenant() } : y)) }),
        (x) => ({ ...x, decisions: x.decisions.map((y) => (y.id === dec.id ? { ...y, reponse: dec.reponse, reponduLe: dec.reponduLe } : y)) }),
        'Réponse enregistrée',
      ),
    )
  const repondreChantier = (ch: Chantier, oui: 'oui' | 'non' | 'plus-tard', animer = false) =>
    traiter(ch.id, animer, () =>
      ecrire(
        { action: 'chantier', id: ch.id, choix: oui },
        (x) => ({ ...x, chantiers: x.chantiers.map((y) => (y.id === ch.id ? { ...y, reponse: oui, repondu_le: maintenant() } : y)) }),
        (x) => ({ ...x, chantiers: x.chantiers.map((y) => (y.id === ch.id ? { ...y, reponse: ch.reponse ?? '', repondu_le: ch.repondu_le ?? '' } : y)) }),
        'Réponse enregistrée',
      ),
    )
  /* true = Garder, false = Jeter, 'plus-tard' = la carte revient demain (statut inchangé). */
  const trancherIdee = (idee: Idee, choixIdee: boolean | 'plus-tard', animer = false) => {
    const rep = choixIdee === true ? 'oui' : choixIdee === false ? 'non' : 'plus-tard'
    return traiter(idee.id, animer, () =>
      ecrire(
        { action: 'idee', id: idee.id, choix: rep },
        (x) => ({
          ...x,
          idees: x.idees.map((y) =>
            y.id === idee.id ? { ...y, reponse: rep, repondu_le: maintenant(), statut: rep === 'oui' ? 'en essai' : rep === 'non' ? 'refusé' : y.statut } : y,
          ),
        }),
        (x) => ({ ...x, idees: x.idees.map((y) => (y.id === idee.id ? idee : y)) }),
        rep === 'oui' ? 'Noté : on garde' : rep === 'non' ? 'Noté : on jette' : 'Noté : je te le redemande demain',
      ),
    )
  }
  /* Fait défiler jusqu'à une carte ou une section, et la marque un instant. */
  const aller = (id: string, marquer = true) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
    if (marquer) {
      setMarque(id)
      window.setTimeout(() => setMarque(''), 2200)
    }
  }
  const statutOpp = (o: Opportunite, statut: string) =>
    traiter(o.id, false, () =>
      ecrire(
        { action: 'opp_statut', id: o.id, statut },
        (x) => ({ ...x, opportunites: x.opportunites.map((y) => (y.id === o.id ? { ...y, statut } : y)) }),
        (x) => ({ ...x, opportunites: x.opportunites.map((y) => (y.id === o.id ? o : y)) }),
        'Statut enregistré',
      ),
    )
  const ajouterOpp = async (o: { quoi: string; montant: string; action: string; quand: string }) => {
    const neuve: Opportunite = { id: 'tmp-' + Date.now(), date: new Date().toISOString().slice(0, 10), statut: 'en cours', origine: 'téléphone', ...o }
    const r = await ecrire(
      { action: 'opp_ajout', quoi: o.quoi, montant: o.montant, etape: o.action, quand: o.quand },
      (x) => ({ ...x, opportunites: [neuve, ...x.opportunites] }),
      (x) => ({ ...x, opportunites: x.opportunites.filter((y) => y.id !== neuve.id) }),
      'Opportunité ajoutée',
    )
    // Relecture : l'opportunité prend son vrai identifiant, sinon « Gagné » juste après échouerait.
    if (r && !demo) charger()
    return !!r
  }

  /* « Dire un truc à Claude » : le texte reste dans la case (et dans le téléphone) tant que l'envoi n'a pas réussi. */
  const changerBrouillon = (t: string) => {
    setBrouillon(t)
    setErreurMessage('')
    if (!t.trim()) idMessage.current = '' // case vidée = nouveau message, sinon le script le prendrait pour un doublon
    if (!idMessage.current) idMessage.current = 'm' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
    try { localStorage.setItem(BROUILLON, JSON.stringify({ texte: t, id: idMessage.current })) } catch {}
  }
  const envoyerMessage = async () => {
    const texte = brouillon.trim()
    if (texte.length < 2 || messageEnCours.current) return
    messageEnCours.current = true
    setEnvoi(true)
    setErreurMessage('')
    try {
      const r = await appeler({ action: 'message', id: idMessage.current, texte })
      if (!r.ok) throw new Error(r.error)
      setBrouillon('')
      idMessage.current = ''
      try { localStorage.removeItem(BROUILLON) } catch {}
      setMessageOuvert(false)
      dire(demo ? 'Envoyé (démonstration, rien d’envoyé)' : 'Envoyé à Claude')
    } catch {
      setErreurMessage('Pas envoyé. Ton texte est gardé, réessaie dans un instant.')
    } finally {
      messageEnCours.current = false
      setEnvoi(false)
    }
  }

  if (!d) {
    return (
      <Cadre onActualiser={charger} charge={etat === 'charge'} demo={demo} maj="" onMessage={() => setMessageOuvert(true)}>
        {etat === 'charge' ? (
          <>
            <p className="mb-4 flex items-center gap-3 text-[24px] font-extrabold leading-tight" role="status">
              <RefreshCw size={24} className="shrink-0 animate-spin" aria-hidden /> Je regarde ce qui t’attend…
            </p>
            {lent && <p className="mb-4 text-[16px]" style={{ color: 'var(--ink-2)' }}>Google met du temps à répondre, j’attends encore.</p>}
            <div className="flex flex-col gap-3" aria-hidden>
              <div className={`${carte} h-[190px] animate-pulse`} />
              <div className={`${carte} h-[190px] animate-pulse`} />
            </div>
          </>
        ) : (
          <div className={carte}><Panne etat={etat} /></div>
        )}
        {messageOuvert && (
          <EcranMessage texte={brouillon} onChange={changerBrouillon} onEnvoyer={envoyerMessage} onFermer={() => setMessageOuvert(false)} envoi={envoi} erreur={erreurMessage} />
        )}
      </Cadre>
    )
  }

  /* Les cartes : grave d'abord, puis les chantiers qui attendent un go, puis l'utile. */
  const ouvertes = d.decisions.filter((x) => !aRepondu(x) && !agentDecision(x))
  const chezAgents = d.decisions.filter((x) => !aRepondu(x) && agentDecision(x) && !sortantes.includes(x.id)).length
  const cartes: Carte[] = [
    ...ouvertes.filter((x) => x.gravite === 'grave').map((dec): Carte => ({ type: 'decision', id: dec.id, dec })),
    ...d.chantiers.filter((x) => x.etat === 'attend-go' && !aRepondu(x)).map((ch): Carte => ({ type: 'chantier', id: ch.id, ch })),
    ...ouvertes.filter((x) => x.gravite !== 'grave').map((dec): Carte => ({ type: 'decision', id: dec.id, dec })),
  ]
  const restantes = cartes.filter((c) => !sortantes.includes(c.id)).length
  const repondues = d.decisions.filter(aRepondu).length + d.chantiers.filter((x) => x.etat === 'attend-go' && aRepondu(x)).length
  const bilan = d.bilanNuit && d.bilanNuit.lignes.length ? d.bilanNuit : null
  const perime = !!bilan && !demo && !!bilan.maj && Date.now() - new Date(bilan.maj).getTime() > 40 * 3600 * 1000

  return (
    <Cadre onActualiser={charger} charge={etat === 'charge'} lent={lent} demo={demo} maj={d.maj} onMessage={() => setMessageOuvert(true)}>
      {etat !== 'ok' && etat !== 'charge' && (
        <div className={`${carte} mb-4`}>
          <Panne etat={etat} />
        </div>
      )}
      {/* 1. Ce qui attend sa réponse */}
      <section aria-live="polite">
        {restantes > 0 ? (
          <h1 className="mb-4 text-[28px] font-extrabold leading-tight">
            J’ai besoin de toi pour {restantes} chose{restantes > 1 ? 's' : ''}
          </h1>
        ) : etat === 'ok' || etat === 'charge' ? (
          <div className="mb-2 flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: 'var(--brand)', color: 'var(--on-brand)' }}>
              <Check size={32} strokeWidth={2.5} aria-hidden />
            </span>
            <div>
              <h1 className="text-[26px] font-extrabold leading-tight">Rien à décider aujourd’hui</h1>
              <p className="mt-1 text-[16px]" style={{ color: 'var(--ink-2)' }}>Je te le dis ici dès qu’une question t’attend.</p>
            </div>
          </div>
        ) : (
          <h1 className="mb-2 text-[24px] font-extrabold leading-tight">Je ne peux pas lire tes questions pour l’instant</h1>
        )}
        {chezAgents > 0 && (
          <button
            type="button"
            onClick={() => aller('section-agents', false)}
            className="mb-2 flex min-h-[48px] items-center gap-1.5 px-1 text-[16px] underline underline-offset-4"
            style={{ color: 'var(--ink-2)' }}
          >
            <ArrowDown size={16} aria-hidden /> et {pluriel(chezAgents, 'question', 'questions')} chez les agents
          </button>
        )}
        <div className="flex flex-col gap-3">
          {cartes.map((c) => (
            <Anime key={c.id} id={`carte-${c.id}`} sort={sortantes.includes(c.id)}>
              {c.type === 'decision' ? (
                <CarteDecision dec={c.dec} marque={marque === `carte-${c.id}`} onRepondre={(l) => repondre(c.dec, l, true)} />
              ) : (
                <CarteChantier ch={c.ch} marque={marque === `carte-${c.id}`} onRepondre={(l) => repondreChantier(c.ch, l, true)} />
              )}
            </Anime>
          ))}
        </div>
      </section>

      {/* 1 bis. Les robots qui pilotent les Ads */}
      <RobotsSection liste={d.robots ?? []} decisions={d.decisions} demo={demo} onVoir={(id) => aller(`carte-${id}`)} />

      {/* 1 ter. Les agents et leurs opportunités */}
      <AgentsSection
        d={d}
        ouverts={ouverts}
        onBascule={(cle) => setOuverts((o) => (o.includes(cle) ? o.filter((x) => x !== cle) : [...o, cle]))}
        sortantes={sortantes}
        marque={marque}
        onRepondre={(dec, l) => repondre(dec, l, true)}
        onIdee={(i, c) => trancherIdee(i, c, true)}
      />

      {/* 2. Cette nuit */}
      <section className={`${carte} mt-6`} aria-labelledby="titre-nuit">
        <h2 id="titre-nuit" className="mb-3 flex items-center gap-2 text-[20px] font-extrabold">
          <Moon size={22} strokeWidth={1.5} aria-hidden /> Cette nuit
        </h2>
        {bilan && !perime ? (
          <ul className="space-y-3">
            {bilan.lignes.slice(0, 5).map((l, i) => (
              <li key={i} className="flex gap-3 text-[17px] leading-snug">
                <span className="mt-[9px] h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: 'var(--brand)' }} aria-hidden />
                <span>{nettoyer(l)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[17px]">
            Rien cette nuit.
            {perime && bilan?.maj && <span className="mt-1 block text-[14px]" style={{ color: 'var(--ink-2)' }}>Dernier bilan : {dateCourte(bilan.maj)}</span>}
          </p>
        )}
      </section>

      {/* 4. Les anciennes vues */}
      <div className="mt-6">
        <button
          type="button"
          onClick={() => setAutreOuvert((o) => !o)}
          aria-expanded={autreOuvert}
          className="flex min-h-[48px] items-center gap-1 px-1 text-[16px] underline underline-offset-4"
          style={{ color: 'var(--ink-2)' }}
        >
          Autre <ChevronDown size={18} aria-hidden className={`transition-transform ${autreOuvert ? 'rotate-180' : ''}`} />
        </button>
        {autreOuvert && (
          <div className="mt-2">
            <Onglets
              valeurs={[
                ['idees', `Idées · ${d.idees.filter((x) => x.statut === 'à essayer').length}`],
                ['opportunites', `Opportunités · ${d.opportunites.filter((x) => x.statut === 'en cours').length}`],
                ['chantiers', `Chantiers · ${d.chantiers.length}`],
                ['repondu', `Répondu · ${repondues}`],
              ] as [Autre, string][]}
              actif={autre}
              onChange={setAutre}
            />
            {autre === 'idees' && <Idees liste={d.idees} onTrancher={(i, oui) => trancherIdee(i, oui)} />}
            {autre === 'opportunites' && <Opportunites liste={d.opportunites} onStatut={statutOpp} onAjouter={ajouterOpp} />}
            {autre === 'chantiers' && <Chantiers d={d} />}
            {autre === 'repondu' && <Repondu d={d} onRepondre={(dec, l) => repondre(dec, l)} onChantier={(ch, l) => repondreChantier(ch, l)} />}
          </div>
        )}
      </div>

      {messageOuvert && (
        <EcranMessage texte={brouillon} onChange={changerBrouillon} onEnvoyer={envoyerMessage} onFermer={() => setMessageOuvert(false)} envoi={envoi} erreur={erreurMessage} />
      )}
      {toast && (
        <div
          role="status"
          className="fixed inset-x-4 z-[60] mx-auto max-w-[440px] rounded-full px-5 py-3 text-center text-[16px] font-bold text-white"
          style={{ bottom: 'calc(96px + env(safe-area-inset-bottom))', backgroundColor: 'var(--g-950)' }}
        >
          {toast}
        </div>
      )}
    </Cadre>
  )
}

/* ---------------------------------------------------------------- cadre */

function Cadre({
  children, onActualiser, charge, lent, maj, demo, onMessage,
}: { children: React.ReactNode; onActualiser: () => void; charge: boolean; lent?: boolean; maj: string; demo?: boolean; onMessage: () => void }) {
  return (
    <div
      className="min-h-dvh"
      style={{ backgroundColor: 'var(--surface-3)', color: 'var(--ink)', paddingBottom: 'calc(120px + env(safe-area-inset-bottom))' }}
    >
      <header className="relative bg-white" style={{ paddingTop: 'env(safe-area-inset-top)', boxShadow: 'var(--ombre-carte)' }}>
        <div className="mx-auto flex h-[68px] max-w-[640px] items-center justify-between gap-3 px-4">
          <Image src="/logo/logotype.svg" alt="123digital" width={210} height={43} unoptimized style={{ height: 43, width: 'auto' }} priority />
          <button
            type="button"
            onClick={onActualiser}
            disabled={charge}
            className="btn-contour btn-sans-fleche min-h-[48px] gap-2 !px-4 !text-[0.9rem] disabled:opacity-60"
            aria-label="Actualiser"
          >
            <RefreshCw size={16} aria-hidden className={charge ? 'animate-spin' : ''} /> {charge ? 'Je charge…' : 'Actualiser'}
          </button>
        </div>
        {charge && lent && (
          <p className="absolute inset-x-0 top-full z-30 bg-white px-4 py-1 text-center text-[13px]" style={{ color: 'var(--ink-2)' }} role="status">
            Google met du temps à répondre, j’attends encore.
          </p>
        )}
      </header>
      <main className="mx-auto max-w-[640px] px-4 pt-5">
        {demo && (
          <p className="mb-4 rounded-full bg-white px-4 py-2 text-center text-[14px] font-bold" style={{ color: 'var(--ink-2)' }}>
            Démonstration, données fictives
          </p>
        )}
        {children}
        {maj && (
          <p className="mt-8 text-center text-[13px]" style={{ color: 'var(--ink-2)', opacity: 0.75 }}>
            Synchro du PC : {dateCourte(maj)}
          </p>
        )}
      </main>
      {/* 3. La barre fixe : un seul gros bouton */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 bg-white"
        style={{ boxShadow: '0 -6px 24px oklch(0.30 0.06 155 / 10%)', paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="mx-auto max-w-[640px] px-4 py-3">
          <button type="button" onClick={onMessage} className="btn-plein !w-full justify-center gap-2 !text-[1.1rem] min-h-[56px]">
            <MessageCircle size={22} aria-hidden /> Dire un truc à Claude
          </button>
        </div>
      </div>
    </div>
  )
}

function EcranMessage({
  texte, onChange, onEnvoyer, onFermer, envoi, erreur,
}: { texte: string; onChange: (t: string) => void; onEnvoyer: () => void; onFermer: () => void; envoi: boolean; erreur: string }) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" style={{ backgroundColor: 'var(--surface-3)', paddingTop: 'env(safe-area-inset-top)' }} role="dialog" aria-modal="true" aria-label="Dire un truc à Claude">
      <div className="mx-auto max-w-[640px] px-4 pb-6">
        <div className="flex h-[68px] items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-[20px] font-extrabold"><MessageCircle size={22} aria-hidden /> Dire un truc à Claude</p>
          <button type="button" onClick={onFermer} aria-label="Fermer, le texte est gardé" className="flex h-12 w-12 items-center justify-center rounded-full bg-white" style={{ boxShadow: 'var(--ombre-carte)' }}>
            <X size={22} aria-hidden />
          </button>
        </div>
        <textarea
          value={texte}
          onChange={(e) => onChange(e.target.value)}
          autoFocus
          maxLength={4000}
          placeholder="Écris ici, comme à un collègue."
          aria-label="Ton message pour Claude"
          className="block h-[34dvh] min-h-[160px] w-full resize-none rounded-[var(--radius)] border bg-white p-5 text-[18px] leading-snug"
          style={{ borderColor: 'var(--g-500)', color: 'var(--ink)' }}
        />
        {erreur && (
          <p className="mt-3 flex items-start gap-2 text-[16px] font-bold" style={{ color: 'var(--alerte)' }} role="alert">
            <CircleAlert size={20} className="mt-0.5 shrink-0" aria-hidden /> {erreur}
          </p>
        )}
        <button
          type="button"
          onClick={onEnvoyer}
          disabled={envoi || texte.trim().length < 2}
          className="btn-plein mt-4 !w-full justify-center !text-[1.1rem] min-h-[56px] disabled:opacity-50"
        >
          {envoi ? 'Envoi…' : 'Envoyer'}
        </button>
      </div>
    </div>
  )
}

function Panne({ etat }: { etat: string }) {
  const textes: Record<string, string> = {
    cle: 'Ce lien n’ouvre plus l’Espace. Demande le nouveau lien à Claude.',
    branchement: 'La feuille n’est pas encore branchée. Il reste à autoriser le script Google une fois.',
    reseau: 'Pas de réseau ou Google ne répond pas. Ce qui est affiché peut dater : touche Actualiser.',
  }
  return (
    <p className="flex items-start gap-2 text-[16px]" role="alert">
      <CircleAlert size={20} className="mt-0.5 shrink-0" style={{ color: 'var(--alerte)' }} aria-hidden />
      {textes[etat] ?? textes.reseau}
    </p>
  )
}

/* ---------------------------------------------------------------- les cartes-questions */

/* Enveloppe d'une carte-question : se replie (hauteur, opacité) quand on y répond. */
function Anime({ id, sort, children }: { id?: string; sort: boolean; children: React.ReactNode }) {
  return (
    <div
      id={id}
      className={`grid scroll-mt-4 transition-[grid-template-rows,opacity,transform] duration-[250ms] ease-out motion-reduce:transition-none ${sort ? 'pointer-events-none grid-rows-[0fr] scale-95 opacity-0' : 'grid-rows-[1fr] opacity-100'}`}
    >
      <div className="-mx-3 -mb-6 -mt-2 min-h-0 overflow-hidden px-3 pb-6 pt-2">{children}</div>
    </div>
  )
}
const reperage = (marque?: boolean) => ({ outline: `3px solid ${marque ? 'var(--brand)' : 'transparent'}`, transition: 'outline-color 200ms ease-out' })

function CarteDecision({ dec, onRepondre, marque }: { dec: Decision; onRepondre: (lettre: string) => void; marque?: boolean }) {
  const grave = dec.gravite === 'grave'
  return (
    <article className={carte} style={reperage(marque)}>
      <p className="mb-2 flex items-center gap-1.5 text-[14px] font-bold uppercase tracking-wide" style={{ color: grave ? 'var(--alerte)' : 'var(--ink-2)' }}>
        {grave && <CircleAlert size={16} aria-hidden />} {grave ? 'Grave' : 'Utile'}
      </p>
      <h2 className="text-[20px] font-bold leading-snug">{dec.question}</h2>
      <div className="mt-4 flex flex-col gap-2">
        {dec.options.map((o) => (
          <button key={o.lettre} type="button" onClick={() => onRepondre(o.lettre)} className={`${o.recommande ? 'btn-plein' : 'btn-contour'} ${reponse}`}>
            {o.texte}
            {o.recommande && <span className="text-[13px] font-semibold opacity-90">conseillé</span>}
          </button>
        ))}
        <button type="button" onClick={() => onRepondre('plus-tard')} className={`btn-contour ${reponse} gap-2`}>
          <Clock size={18} aria-hidden /> Plus tard
        </button>
      </div>
    </article>
  )
}

function CarteChantier({ ch, onRepondre, marque }: { ch: Chantier; onRepondre: (r: 'oui' | 'non' | 'plus-tard') => void; marque?: boolean }) {
  return (
    <article className={carte} style={reperage(marque)}>
      <p className="mb-2 flex items-center gap-1.5 text-[14px] font-bold uppercase tracking-wide" style={{ color: 'var(--ink-2)' }}>
        <Hammer size={16} aria-hidden /> Attend ton go
      </p>
      <h2 className="text-[20px] font-bold leading-snug">
        {ch.question ? ch.question.replace(/\s*\?\s*$/, '') : `Je mets en ligne : ${ch.titre}`}{'\u00a0'}?
      </h2>
      <div className="mt-4 flex flex-col gap-2">
        {/^https?:\/\//.test(ch.lien) && (
          <a href={ch.lien} target="_blank" rel="noreferrer" className={`btn-contour ${reponse} gap-2`}>
            <ExternalLink size={18} aria-hidden /> Voir l’aperçu
          </a>
        )}
        <button type="button" onClick={() => onRepondre('oui')} className={`btn-plein ${reponse}`}>Oui, mets en ligne</button>
        <button type="button" onClick={() => onRepondre('non')} className={`btn-contour ${reponse}`}>Non</button>
        <button type="button" onClick={() => onRepondre('plus-tard')} className={`btn-contour ${reponse} gap-2`}>
          <Clock size={18} aria-hidden /> Plus tard
        </button>
      </div>
    </article>
  )
}

/* ---------------------------------------------------------------- Robots */

function RobotsSection({ liste, decisions, demo, onVoir }: { liste: Robot[]; decisions: Decision[]; demo: boolean; onVoir: (id: string) => void }) {
  return (
    <section className="mt-8" aria-labelledby="titre-robots">
      <h2 id="titre-robots" className="mb-3 flex items-center gap-2 text-[22px] font-extrabold">
        <Bot size={24} strokeWidth={1.5} aria-hidden /> Robots
      </h2>
      {!liste.length ? (
        <p className={`${carte} text-[17px]`} style={{ color: 'var(--ink-2)' }}>
          Aucun passage pour l’instant. Chaque robot écrit ici après son passage du matin.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {liste.map((r) => (
            <CarteRobot key={r.slug} r={r} decisions={decisions} demo={demo} onVoir={onVoir} />
          ))}
        </div>
      )}
    </section>
  )
}

function CarteRobot({ r, decisions, demo, onVoir }: { r: Robot; decisions: Decision[]; demo: boolean; onVoir: (id: string) => void }) {
  const lignes = (r.en_clair || '').split(' / ').map((l) => l.trim()).filter(Boolean)
  const [ouvertureMs] = useState(() => Date.now())
  const joursSansPassage = r.date && !demo ? Math.floor((ouvertureMs - new Date(r.date).getTime()) / 86_400_000) : 0
  const muet = joursSansPassage >= 3
  const etat = r.etat === 'rouge' ? 'rouge' : r.etat === 'orange' || muet ? 'orange' : 'vert'
  const { libelle, couleur } = ETAT_ROBOT[etat]
  const depense = nombre(r.depense)
  const projection = nombre(r.projection)
  const plafond = nombre(r.plafond)
  const part = (n: number) => (plafond > 0 ? Math.min(100, Math.max(0, (n / plafond) * 100)) : 0)
  const demandes = decisions.filter((x) => !aRepondu(x) && (x.id.startsWith(`pilote-${r.slug}-`) || (r.decision_id || '').split(/[\s,]+/).includes(x.id)))
  const [va, pasBien, budget] = lignes
  const rienAReporter = !pasBien || /^rien/i.test(pasBien)
  return (
    <article className={carte}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[20px] font-extrabold leading-snug">{r.client}</h3>
        <p className="flex shrink-0 items-center gap-2 pt-0.5 text-[15px] font-bold" style={{ color: couleur }}>
          <span className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: couleur }} aria-hidden /> {libelle}
        </p>
      </div>
      <ul className="mt-3 space-y-2.5">
        {va && (
          <li className="flex gap-3 text-[17px] leading-snug">
            <Check size={20} className="mt-0.5 shrink-0" style={{ color: 'var(--brand)' }} aria-hidden /> <span>{va}</span>
          </li>
        )}
        {pasBien && (
          <li className="flex gap-3 text-[17px] leading-snug">
            {rienAReporter ? (
              <Check size={20} className="mt-0.5 shrink-0" style={{ color: 'var(--brand)' }} aria-hidden />
            ) : (
              <CircleAlert size={20} className="mt-0.5 shrink-0" style={{ color: couleur }} aria-hidden />
            )}
            <span>{pasBien}</span>
          </li>
        )}
        {muet && (
          <li className="flex gap-3 text-[17px] font-bold leading-snug">
            <CircleAlert size={20} className="mt-0.5 shrink-0" style={{ color: couleur }} aria-hidden /> <span>Pas de passage depuis {joursSansPassage} jours</span>
          </li>
        )}
        {budget && (
          <li className="flex gap-3 text-[17px] leading-snug">
            <Wallet size={20} strokeWidth={1.5} className="mt-0.5 shrink-0" style={{ color: 'var(--ink-2)' }} aria-hidden /> <span>{budget}</span>
          </li>
        )}
      </ul>
      {plafond > 0 && (
        <>
          <div
            className="mt-4 h-2.5 overflow-hidden rounded-full"
            style={{ backgroundColor: 'var(--g-100)' }}
            role="img"
            aria-label={`Dépensé ${euros(depense)}, projection ${euros(projection)}, plafond ${euros(plafond)}`}
          >
            <div className="relative h-full">
              <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${part(projection)}%`, backgroundColor: couleur, opacity: 0.3 }} />
              <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${part(depense)}%`, backgroundColor: couleur }} />
            </div>
          </div>
          <dl className="mt-3 grid grid-cols-3 gap-2">
            {(
              [
                ['Dépensé', depense],
                ['Projection', projection],
                ['Plafond', plafond],
              ] as [string, number][]
            ).map(([l, n]) => (
              <div key={l}>
                <dt className="text-[13px]" style={{ color: 'var(--ink-2)' }}>{l}</dt>
                <dd className="text-[19px] font-extrabold leading-tight" style={{ color: l === 'Projection' && projection > plafond ? 'var(--alerte)' : 'var(--ink)' }}>
                  {euros(n)}
                </dd>
              </div>
            ))}
          </dl>
        </>
      )}
      {demandes.length > 0 && (
        <button type="button" onClick={() => onVoir(demandes[0].id)} className={`btn-contour ${reponse} mt-4 gap-2`}>
          <ArrowDown size={18} aria-hidden /> {demandes.length > 1 ? `Voir les ${demandes.length} demandes du robot` : 'Voir la demande du robot'}
        </button>
      )}
      {r.date && <p className="mt-3 text-[13px]" style={{ color: 'var(--ink-2)' }}>Passage du {dateCourte(r.date)}</p>}
    </article>
  )
}

/* ---------------------------------------------------------------- Agents */

function AgentsSection({
  d, ouverts, onBascule, sortantes, marque, onRepondre, onIdee,
}: {
  d: Donnees
  ouverts: string[]
  onBascule: (cle: string) => void
  sortantes: string[]
  marque: string
  onRepondre: (dec: Decision, lettre: string) => void
  onIdee: (i: Idee, c: boolean | 'plus-tard') => void
}) {
  const blocs = AGENTS.map((a) => {
    const questions = d.decisions.filter((x) => agentDecision(x) === a.cle && !aRepondu(x))
    const idees = d.idees.filter((i) => agentIdee(i) === a.cle)
    const opportunites = idees.filter((i) => i.statut === 'à essayer' && !aRepondu(i))
    const gardees = idees.filter((i) => i.statut === 'en essai' || i.statut === 'adopté').length
    const jetees = idees.filter((i) => i.statut === 'refusé').length
    return { a, questions, opportunites, gardees, jetees }
  }).filter((b) => b.questions.length + b.opportunites.length + b.gardees + b.jetees > 0)
  return (
    <section id="section-agents" className="mt-8 scroll-mt-4" aria-labelledby="titre-agents">
      <h2 id="titre-agents" className="mb-3 flex items-center gap-2 text-[22px] font-extrabold">
        <Radar size={24} strokeWidth={1.5} aria-hidden /> Agents
      </h2>
      {!blocs.length && <p className={`${carte} text-[17px]`} style={{ color: 'var(--ink-2)' }}>Aucun agent n’a de question pour l’instant.</p>}
      <div className="flex flex-col gap-3">
        {blocs.map(({ a, questions, opportunites, gardees, jetees }) => {
          const ouvert = ouverts.includes(a.cle)
          const q = questions.filter((x) => !sortantes.includes(x.id)).length
          const o = opportunites.filter((x) => !sortantes.includes(x.id)).length
          const grave = questions.some((x) => x.gravite === 'grave' && !sortantes.includes(x.id))
          const Icone = a.Icone
          return (
            <div key={a.cle}>
              <button
                type="button"
                onClick={() => onBascule(a.cle)}
                aria-expanded={ouvert}
                aria-controls={`agent-${a.cle}`}
                className={`${carte} flex min-h-[72px] w-full items-center gap-3 !py-4 text-left`}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: 'var(--g-100)', color: 'var(--brand)' }}>
                  <Icone size={22} strokeWidth={1.5} aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[18px] font-bold leading-snug">{a.nom}</span>
                  <span className="block text-[15px]" style={{ color: 'var(--ink-2)' }}>
                    {pluriel(q, 'question', 'questions')} · {pluriel(o, 'opportunité', 'opportunités')}
                  </span>
                </span>
                {grave && <CircleAlert size={20} className="shrink-0" style={{ color: 'var(--alerte)' }} aria-label="Une question grave attend" />}
                <ChevronDown size={20} aria-hidden className={`shrink-0 transition-transform duration-200 ease-out motion-reduce:transition-none ${ouvert ? 'rotate-180' : ''}`} />
              </button>
              <div
                id={`agent-${a.cle}`}
                inert={!ouvert}
                className={`grid transition-[grid-template-rows,opacity] duration-[250ms] ease-out motion-reduce:transition-none ${ouvert ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
              >
                <div className="-mx-3 -mb-6 min-h-0 overflow-hidden px-3 pb-6">
                  <div className="flex flex-col gap-3 pt-3">
                    {questions.map((dec) => (
                      <Anime key={dec.id} id={`carte-${dec.id}`} sort={sortantes.includes(dec.id)}>
                        <CarteDecision dec={dec} marque={marque === `carte-${dec.id}`} onRepondre={(l) => onRepondre(dec, l)} />
                      </Anime>
                    ))}
                    {opportunites.map((i) => (
                      <Anime key={i.id} sort={sortantes.includes(i.id)}>
                        <CarteOpportuniteAgent idee={i} onChoix={(c) => onIdee(i, c)} />
                      </Anime>
                    ))}
                    {!questions.length && !opportunites.length && (
                      <p className="px-1 text-[16px]" style={{ color: 'var(--ink-2)' }}>Rien en attente de ta réponse.</p>
                    )}
                    {(gardees > 0 || jetees > 0) && (
                      <p className="px-1 text-[14px]" style={{ color: 'var(--ink-2)' }}>
                        Déjà tranché : {pluriel(gardees, 'gardée', 'gardées')}, {pluriel(jetees, 'jetée', 'jetées')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function CarteOpportuniteAgent({ idee, onChoix }: { idee: Idee; onChoix: (c: boolean | 'plus-tard') => void }) {
  const bouton = 'btn-sans-fleche !flex-col justify-center !gap-1 !px-1 !py-2 !text-[0.95rem] min-h-[64px] !w-full'
  const quand = [idee.metier, dateCourte(idee.date)].filter(Boolean).join(' · ')
  return (
    <article className={carte}>
      <p className="mb-1 flex items-center gap-1.5 text-[14px] font-bold uppercase tracking-wide" style={{ color: 'var(--ink-2)' }}>
        <Lightbulb size={16} aria-hidden /> Opportunité{quand ? ` · ${quand}` : ''}
      </p>
      <h3 className="text-[19px] font-bold leading-snug">{idee.trouvaille}</h3>
      {idee.commentaire && <p className="mt-1 text-[16px]">{idee.commentaire}</p>}
      {idee.verdict && (
        <p className="mt-2 text-[15px]" style={{ color: 'var(--ink-2)' }}>
          Le tri conseille : <b>{VERDICTS[idee.verdict] ?? idee.verdict}</b>
        </p>
      )}
      <div className="mt-4 grid grid-cols-3 gap-2">
        <button type="button" onClick={() => onChoix(true)} className={`${idee.verdict === 'a-mettre' ? 'btn-plein' : 'btn-contour'} ${bouton}`}>
          <Bookmark size={18} aria-hidden /> Garder
        </button>
        <button type="button" onClick={() => onChoix(false)} className={`btn-contour ${bouton}`}>
          <Trash2 size={18} aria-hidden /> Jeter
        </button>
        <button type="button" onClick={() => onChoix('plus-tard')} className={`btn-contour ${bouton}`}>
          <Clock size={18} aria-hidden /> Plus tard
        </button>
      </div>
    </article>
  )
}

/* ---------------------------------------------------------------- « Autre » : anciennes vues */

/* Choix exclusifs en pilules, sur une ligne qui glisse si elle déborde (jamais de liste déroulante). */
function Onglets<T extends string>({ valeurs, actif, onChange }: { valeurs: [T, string][]; actif: T; onChange: (v: T) => void }) {
  return (
    <div className="-mx-4 mb-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {valeurs.map(([v, libelle]) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          aria-pressed={actif === v}
          className={`${actif === v ? 'btn-plein' : 'btn-contour'} ${choix} shrink-0`}
          style={actif === v ? undefined : { backgroundColor: 'white' }}
        >
          {libelle}
        </button>
      ))}
    </div>
  )
}

function Vide({ texte }: { texte: string }) {
  return <p className={`${carte} text-[17px]`} style={{ color: 'var(--ink-2)' }}>{texte}</p>
}

function Titre({ icone, texte }: { icone: React.ReactNode; texte: string }) {
  return (
    <h2 className="mb-3 flex items-center gap-2 text-[22px] font-extrabold">
      {icone} {texte}
    </h2>
  )
}

/* Répondu : les décisions et les go déjà donnés, avec « Changer » en cas d'erreur de doigt. */
function Repondu({
  d, onRepondre, onChantier,
}: { d: Donnees; onRepondre: (d: Decision, l: string) => void; onChantier: (c: Chantier, r: 'oui' | 'non' | 'plus-tard') => void }) {
  const [changer, setChanger] = useState('')
  const decisions = d.decisions.filter(aRepondu)
  const chantiers = d.chantiers.filter((x) => x.etat === 'attend-go' && aRepondu(x))
  const LIBELLE: Record<string, string> = { oui: 'Oui, mets en ligne', non: 'Non', 'plus-tard': 'Plus tard' }
  return (
    <>
      <Titre icone={<Signpost size={22} strokeWidth={1.5} />} texte="Répondu" />
      {!decisions.length && !chantiers.length && <Vide texte="Aucune réponse pour l’instant." />}
      <div className="flex flex-col gap-3">
        {decisions.map((dec) => {
          const choisie = dec.options.find((o) => o.lettre === dec.reponse)
          const ouvert = changer === dec.id
          return (
            <article key={dec.id} className={carte}>
              <p className="text-[18px] font-bold leading-snug">{dec.question}</p>
              <p className="mt-2 flex items-center gap-1 text-[16px]" style={{ color: 'var(--brand)' }}>
                {dec.reponse === 'plus-tard' ? <Clock size={16} aria-hidden /> : <Check size={16} aria-hidden />}
                {dec.reponse === 'plus-tard' ? 'Plus tard' : choisie?.texte ?? `Choix ${dec.reponse}`}
              </p>
              {ouvert ? (
                <div className="mt-3 flex flex-col gap-2">
                  {dec.options.map((o) => (
                    <button key={o.lettre} type="button" onClick={() => { onRepondre(dec, o.lettre); setChanger('') }} className={`${o.recommande ? 'btn-plein' : 'btn-contour'} ${reponse}`}>{o.texte}</button>
                  ))}
                  <button type="button" onClick={() => { onRepondre(dec, 'plus-tard'); setChanger('') }} className={`btn-contour ${reponse} gap-2`}><Clock size={18} aria-hidden /> Plus tard</button>
                </div>
              ) : (
                <button type="button" onClick={() => setChanger(dec.id)} className={`btn-contour ${choix} mt-3`}>Changer</button>
              )}
            </article>
          )
        })}
        {chantiers.map((c) => {
          const ouvert = changer === c.id
          return (
            <article key={c.id} className={carte}>
              <p className="text-[18px] font-bold leading-snug">Mise en ligne : {c.titre}</p>
              <p className="mt-2 flex items-center gap-1 text-[16px]" style={{ color: 'var(--brand)' }}>
                {c.reponse === 'plus-tard' ? <Clock size={16} aria-hidden /> : <Check size={16} aria-hidden />} {LIBELLE[c.reponse ?? ''] ?? c.reponse}
              </p>
              {ouvert ? (
                <div className="mt-3 flex flex-col gap-2">
                  <button type="button" onClick={() => { onChantier(c, 'oui'); setChanger('') }} className={`btn-plein ${reponse}`}>Oui, mets en ligne</button>
                  <button type="button" onClick={() => { onChantier(c, 'non'); setChanger('') }} className={`btn-contour ${reponse}`}>Non</button>
                  <button type="button" onClick={() => { onChantier(c, 'plus-tard'); setChanger('') }} className={`btn-contour ${reponse} gap-2`}><Clock size={18} aria-hidden /> Plus tard</button>
                </div>
              ) : (
                <button type="button" onClick={() => setChanger(c.id)} className={`btn-contour ${choix} mt-3`}>Changer</button>
              )}
            </article>
          )
        })}
      </div>
    </>
  )
}

/* ---------------------------------------------------------------- Idées R&D */

const VERDICTS: Record<string, string> = { 'a-mettre': 'à mettre', 'a-surveiller': 'attendre', 'a-ne-pas-mettre': 'ne pas mettre' }
const STATUTS_IDEE: [string, string][] = [['à essayer', 'À essayer'], ['en essai', 'En essai'], ['adopté', 'Adopté'], ['refusé', 'Refusé']]

function Idees({ liste, onTrancher }: { liste: Idee[]; onTrancher: (i: Idee, oui: boolean) => void }) {
  const [vue, setVue] = useState('à essayer')
  const montrees = liste.filter((x) => x.statut === vue).reverse()
  return (
    <>
      <Titre icone={<Lightbulb size={22} strokeWidth={1.5} />} texte="Idées R&D" />
      <Onglets
        valeurs={STATUTS_IDEE.map(([v, l]) => [v, `${l} · ${liste.filter((x) => x.statut === v).length}`] as [string, string])}
        actif={vue}
        onChange={setVue}
      />
      {!montrees.length && <Vide texte="Rien ici pour l’instant." />}
      <div className="flex flex-col gap-3">
        {montrees.map((i) => (
          <article key={i.id} className={carte}>
            <div className="mb-1 flex items-center justify-between gap-2 text-[14px]" style={{ color: 'var(--ink-2)' }}>
              <span>{[i.metier, dateCourte(i.date)].filter(Boolean).join(' · ')}</span>
              <span className="font-bold" style={{ color: i.statut === 'refusé' ? 'var(--ink-2)' : 'var(--brand)' }}>{STATUTS_IDEE.find(([v]) => v === i.statut)?.[1]}</span>
            </div>
            <p className="text-[18px] font-bold leading-snug">{i.trouvaille}</p>
            {i.commentaire && <p className="mt-1 text-[16px]">{i.commentaire}</p>}
            {i.resultat && <p className="mt-2 text-[16px]"><b>Résultat de l’essai :</b> {i.resultat}</p>}
            {i.statut === 'à essayer' && i.verdict && (
              <p className="mt-2 text-[15px]" style={{ color: 'var(--ink-2)' }}>
                Le tri conseille : <b>{VERDICTS[i.verdict] ?? i.verdict}</b>
              </p>
            )}
            {i.statut === 'à essayer' && (
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button type="button" onClick={() => onTrancher(i, true)} className={`${i.verdict === 'a-mettre' ? 'btn-plein' : 'btn-contour'} ${choix} !w-full gap-2`}>
                  <Check size={18} aria-hidden /> Essaie-la
                </button>
                <button type="button" onClick={() => onTrancher(i, false)} className={`btn-contour ${choix} !w-full gap-2`}>
                  <X size={18} aria-hidden /> Non
                </button>
              </div>
            )}
          </article>
        ))}
      </div>
    </>
  )
}

/* ---------------------------------------------------------------- Opportunités */

const STATUTS_OPP: [string, string][] = [['en cours', 'En cours'], ['gagné', 'Gagné'], ['perdu', 'Perdu']]

function Opportunites({
  liste, onStatut, onAjouter,
}: { liste: Opportunite[]; onStatut: (o: Opportunite, s: string) => void; onAjouter: (o: { quoi: string; montant: string; action: string; quand: string }) => Promise<boolean> }) {
  const [vue, setVue] = useState('en cours')
  const [form, setForm] = useState(false)
  const montrees = liste.filter((x) => x.statut === vue)
  const total = liste.filter((x) => x.statut === 'en cours').reduce((s, x) => s + (parseInt(x.montant, 10) || 0), 0)
  return (
    <>
      <Titre icone={<Handshake size={22} strokeWidth={1.5} />} texte="Opportunités" />
      <div className={`${carte} mb-4 flex items-center justify-between gap-3`}>
        <div>
          <p className="text-[14px]" style={{ color: 'var(--ink-2)' }}>En cours, estimé</p>
          <p className="text-[26px] font-extrabold">{euros(total)}</p>
        </div>
        {!form && (
          <button type="button" onClick={() => setForm(true)} className={`btn-plein ${action} gap-2`}>
            <Plus size={18} aria-hidden /> Ajouter
          </button>
        )}
      </div>
      {form && <FormOpp onFermer={() => setForm(false)} onAjouter={onAjouter} />}
      <Onglets valeurs={STATUTS_OPP.map(([v, l]) => [v, `${l} · ${liste.filter((x) => x.statut === v).length}`] as [string, string])} actif={vue} onChange={setVue} />
      {!montrees.length && <Vide texte="Rien ici." />}
      <div className="flex flex-col gap-3">
        {montrees.map((o) => (
          <article key={o.id} className={carte}>
            <div className="flex items-start justify-between gap-3">
              <p className="text-[18px] font-bold leading-snug">{o.quoi}</p>
              <p className="shrink-0 text-[18px] font-extrabold" style={{ color: o.montant ? 'var(--ink)' : 'var(--ink-2)' }}>
                {o.montant ? euros(parseInt(o.montant, 10)) : 'à estimer'}
              </p>
            </div>
            {o.action && <p className="mt-2 text-[16px]"><b>Prochaine étape :</b> {o.action}</p>}
            <p className="mt-1 text-[14px]" style={{ color: 'var(--ink-2)' }}>
              {[QUAND[o.quand], o.origine === 'téléphone' ? 'ajoutée au téléphone' : ''].filter(Boolean).join(' · ')}
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {STATUTS_OPP.map(([v, l]) => (
                <button
                  key={v}
                  type="button"
                  aria-pressed={o.statut === v}
                  onClick={() => o.statut !== v && onStatut(o, v)}
                  className={`${o.statut === v ? 'btn-plein' : 'btn-contour'} ${choix} !w-full !px-2`}
                >
                  {l}
                </button>
              ))}
            </div>
          </article>
        ))}
      </div>
    </>
  )
}

function Champ({ libelle, ...props }: { libelle: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1 block text-[15px] font-bold">{libelle}</span>
      <input
        {...props}
        className="w-full rounded-[var(--radius-ctrl)] border bg-white px-4 py-3 text-[17px]"
        style={{ borderColor: 'var(--g-500)', color: 'var(--ink)' }}
      />
    </label>
  )
}

function FormOpp({ onFermer, onAjouter }: { onFermer: () => void; onAjouter: (o: { quoi: string; montant: string; action: string; quand: string }) => Promise<boolean> }) {
  const [quoi, setQuoi] = useState('')
  const [montant, setMontant] = useState('')
  const [act, setAct] = useState('')
  const [quand, setQuand] = useState('semaine')
  const [envoi, setEnvoi] = useState(false)
  const envoyer = async (e: React.FormEvent) => {
    e.preventDefault()
    if (quoi.trim().length < 2 || envoi) return
    setEnvoi(true)
    const ok = await onAjouter({ quoi: quoi.trim(), montant: montant.replace(/\D/g, ''), action: act.trim(), quand })
    setEnvoi(false)
    if (ok) onFermer()
  }
  return (
    <form onSubmit={envoyer} className={`${carte} mb-4 flex flex-col gap-4`}>
      <Champ libelle="Qui et quoi" value={quoi} onChange={(e) => setQuoi(e.target.value)} placeholder="Client, ce qu’on lui vend" required maxLength={140} />
      <Champ libelle="Montant estimé (€)" value={montant} onChange={(e) => setMontant(e.target.value)} inputMode="numeric" placeholder="Laisser vide si inconnu" maxLength={9} />
      <Champ libelle="Prochaine étape" value={act} onChange={(e) => setAct(e.target.value)} placeholder="Appeler, envoyer le devis…" maxLength={140} />
      <div>
        <span className="mb-1 block text-[15px] font-bold">Pour quand</span>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries({ semaine: 'Semaine', mois: 'Ce mois', 'plus-tard': 'Plus tard' }).map(([v, l]) => (
            <button key={v} type="button" aria-pressed={quand === v} onClick={() => setQuand(v)} className={`${quand === v ? 'btn-plein' : 'btn-contour'} ${choix} !w-full !px-2 !text-[0.95rem]`}>
              {l}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <button type="submit" disabled={envoi || quoi.trim().length < 2} className={`btn-plein ${action} gap-2`}>
          <Plus size={18} aria-hidden /> Ajouter
        </button>
        <button type="button" onClick={onFermer} className={`btn-contour ${choix} gap-2`}>
          <X size={18} aria-hidden /> Fermer
        </button>
      </div>
    </form>
  )
}

/* ---------------------------------------------------------------- Chantiers (avancés, bloqués) et nuit prévue */

const ETATS: [string, string][] = [['attend-go', 'Attend ton go'], ['avance', 'Avance'], ['bloque', 'Bloqué']]

function Chantiers({ d }: { d: Donnees }) {
  return (
    <>
      <Titre icone={<Hammer size={22} strokeWidth={1.5} />} texte="Chantiers" />
      {ETATS.map(([etat, libelle]) => {
        const l = d.chantiers.filter((c) => c.etat === etat)
        if (!l.length) return null
        return (
          <section key={etat} className="mb-4">
            <h3 className="mb-2 text-[16px] font-bold uppercase tracking-wide" style={{ color: etat === 'bloque' ? 'var(--alerte)' : 'var(--ink-2)' }}>
              {libelle} · {l.length}
            </h3>
            <div className="flex flex-col gap-3">
              {l.map((c) => (
                <article key={c.id} className={`${carte} flex items-center justify-between gap-3`}>
                  <p className="text-[17px] font-bold leading-snug">{c.titre}</p>
                  {/^https?:\/\//.test(c.lien) && (
                    <a href={c.lien} target="_blank" rel="noreferrer" className={`btn-contour ${choix} shrink-0 gap-2`}>
                      <ExternalLink size={18} aria-hidden /> Voir
                    </a>
                  )}
                </article>
              ))}
            </div>
          </section>
        )
      })}
      {!d.chantiers.length && <div className="mb-4"><Vide texte="Aucun chantier remonté par le bras droit." /></div>}

      <section className={carte}>
        <h3 className="mb-3 flex items-center gap-2 text-[18px] font-extrabold"><Moon size={20} strokeWidth={1.5} aria-hidden /> Prévu pour la nuit</h3>
        {!d.nuit.length && <p className="text-[16px]" style={{ color: 'var(--ink-2)' }}>Rien de prévu.</p>}
        <ul className="flex flex-col">
          {[...d.nuit].reverse().map((n) => (
            <li key={n.id} className="flex items-start gap-3 border-t py-3 first:border-t-0" style={{ borderColor: 'var(--line)' }}>
              {n.fait ? <Check size={20} className="mt-0.5 shrink-0" style={{ color: 'var(--brand)' }} aria-label="Fait" /> : <Moon size={20} strokeWidth={1.5} className="mt-0.5 shrink-0" aria-label="À faire" />}
              <span className="flex-1 text-[16px]" style={{ color: n.fait ? 'var(--ink-2)' : 'var(--ink)' }}>{n.tache}</span>
              <span className="shrink-0 text-[14px] font-bold" style={{ color: n.fait ? 'var(--brand)' : 'var(--ink-2)' }}>{n.fait ? 'Fait' : 'À faire'}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
