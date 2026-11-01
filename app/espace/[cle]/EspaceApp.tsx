'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import {
  ArrowLeft, Check, CircleAlert, Clock, ExternalLink, Hammer, Handshake, Lightbulb, Moon, Plus, RefreshCw, Send, Signpost, X,
} from 'lucide-react'
import type { Decision, Donnees, Idee, Opportunite } from '@/lib/espace'

/* Espace 123digital (02/11/2026). Navigation du suivi Clim69 : un accueil par rubrique avec
   son compteur, une carte par élément, un seul retour. Règle du CRM Mendel appliquée à Moshé :
   une icône et un mot par action, gros boutons, l'état toujours visible, aucune liste
   déroulante. Charte 123digital : cartes blanches ombrées à 32 px sur vert 100, boutons pilule,
   rond fléché pour les actions, sans rond pour les choix. Icônes Lucide en trait. */

type Ecran = 'accueil' | 'decisions' | 'idees' | 'opportunites' | 'chantiers'
const ECRANS: Ecran[] = ['accueil', 'decisions', 'idees', 'opportunites', 'chantiers']
const CACHE = 'espace-123digital'

const carte = 'rounded-[var(--radius)] bg-white p-5 shadow-[var(--ombre-carte)]'
const choix = 'btn-sans-fleche justify-center !text-[1rem] min-h-[48px] !px-5'
const action = '!text-[1rem] min-h-[48px] !px-6'

function dateCourte(iso: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?/.exec(iso || '')
  if (!m) return ''
  return `${m[3]}/${m[2]}${m[4] ? ` à ${m[4]} h ${m[5]}` : ''}`
}
const euros = (n: number) => n.toLocaleString('fr-FR') + ' €'
const QUAND: Record<string, string> = { semaine: 'Cette semaine', mois: 'Ce mois-ci', 'plus-tard': 'Plus tard' }

export function EspaceApp({ cle, demo }: { cle: string; demo: boolean }) {
  const [d, setD] = useState<Donnees | null>(null)
  const [etat, setEtat] = useState<'charge' | 'ok' | 'cle' | 'branchement' | 'reseau'>('charge')
  const [ecran, setEcran] = useState<Ecran>('accueil')
  const [message, setMessage] = useState('')
  const [nuitOuverte, setNuitOuverte] = useState(false)

  const appeler = useCallback(
    async (corps: Record<string, unknown>) => {
      const r = await fetch('/api/espace', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...corps, cle }),
        cache: 'no-store',
      })
      return (await r.json()) as Donnees & { ok: boolean; error?: string }
    },
    [cle],
  )

  const charger = useCallback(async () => {
    try {
      const r = await appeler({ action: 'donnees' })
      if (r.ok) {
        setD(r)
        setEtat('ok')
        if (!demo) localStorage.setItem(CACHE, JSON.stringify(r))
      } else setEtat(r.error === 'cle' ? 'cle' : r.error === 'branchement' ? 'branchement' : 'reseau')
    } catch {
      setEtat('reseau')
    }
  }, [appeler, demo])

  useEffect(() => {
    if (!demo) {
      try {
        const c = localStorage.getItem(CACHE)
        if (c) setD(JSON.parse(c))
      } catch {}
    }
    const lireHash = () => {
      const h = window.location.hash.slice(1) as Ecran
      setEcran(ECRANS.includes(h) ? h : 'accueil')
    }
    lireHash()
    charger()
    const visible = () => document.visibilityState === 'visible' && charger()
    window.addEventListener('hashchange', lireHash)
    document.addEventListener('visibilitychange', visible)
    return () => {
      window.removeEventListener('hashchange', lireHash)
      document.removeEventListener('visibilitychange', visible)
    }
  }, [charger, demo])

  const aller = (e: Ecran) => {
    window.location.hash = e === 'accueil' ? '' : e
    setEcran(e)
    window.scrollTo(0, 0)
  }

  const dire = (t: string) => {
    setMessage(t)
    window.setTimeout(() => setMessage(''), 3500)
  }

  /* Écriture optimiste : l'écran change tout de suite, et revient si l'envoi échoue. */
  const ecrire = async (corps: Record<string, unknown>, avant: Donnees, apres: Donnees, merci: string) => {
    setD(apres)
    try {
      const r = await appeler(corps)
      if (!r.ok) throw new Error(r.error)
      dire(demo ? `${merci} (démonstration, rien d’envoyé)` : merci)
      return r
    } catch {
      setD(avant)
      dire('Pas envoyé. Réessaie dans un instant.')
      return null
    }
  }

  if (!d) {
    return (
      <Cadre onActualiser={charger} maj="">
        <div className={carte}>
          {etat === 'charge' ? <p className="text-[17px]">Chargement…</p> : <Panne etat={etat} />}
        </div>
      </Cadre>
    )
  }

  const aTrancher = d.decisions.filter((x) => !x.reponse)
  const aEssayer = d.idees.filter((x) => x.statut === 'à essayer')
  const enCours = d.opportunites.filter((x) => x.statut === 'en cours')
  const attendGo = d.chantiers.filter((x) => x.etat === 'attend-go')
  const nuitAFaire = d.nuit.filter((x) => !x.fait)

  const repondre = (dec: Decision, lettre: string) =>
    ecrire(
      { action: 'repondre', id: dec.id, choix: lettre },
      d,
      { ...d, decisions: d.decisions.map((x) => (x.id === dec.id ? { ...x, reponse: lettre, reponduLe: new Date().toISOString() } : x)) },
      'Réponse enregistrée',
    )
  const trancherIdee = (idee: Idee, oui: boolean) =>
    ecrire(
      { action: 'idee', id: idee.id, choix: oui ? 'oui' : 'non' },
      d,
      { ...d, idees: d.idees.map((x) => (x.id === idee.id ? { ...x, reponse: oui ? 'oui' : 'non', statut: oui ? 'en essai' : 'refusé' } : x)) },
      oui ? 'Noté : on l’essaie' : 'Noté : on laisse tomber',
    )
  const statutOpp = (o: Opportunite, statut: string) =>
    ecrire(
      { action: 'opp_statut', id: o.id, statut },
      d,
      { ...d, opportunites: d.opportunites.map((x) => (x.id === o.id ? { ...x, statut } : x)) },
      'Statut enregistré',
    )
  const ajouterOpp = async (o: { quoi: string; montant: string; action: string; quand: string }) => {
    const neuve: Opportunite = { id: 'tmp-' + Date.now(), date: new Date().toISOString().slice(0, 10), statut: 'en cours', origine: 'téléphone', ...o }
    const r = await ecrire({ action: 'opp_ajout', quoi: o.quoi, montant: o.montant, etape: o.action, quand: o.quand }, d, { ...d, opportunites: [neuve, ...d.opportunites] }, 'Opportunité ajoutée')
    return !!r
  }
  const ajouterNuit = async (tache: string) => {
    const t = { id: 'tmp-' + Date.now(), tache, fait: '', lien: '', origine: 'téléphone', ajoute_le: new Date().toISOString() }
    const r = await ecrire({ action: 'nuit_ajout', tache }, d, { ...d, nuit: [...d.nuit, t] }, 'Ajouté pour cette nuit')
    return !!r
  }

  return (
    <Cadre onActualiser={charger} maj={d.maj} demo={demo}>
      {etat !== 'ok' && etat !== 'charge' && (
        <div className={`${carte} mb-4`}>
          <Panne etat={etat} />
        </div>
      )}

      {ecran === 'accueil' && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <Tuile icone={<Signpost size={26} strokeWidth={1.5} />} mot="Décisions" nombre={aTrancher.length} detail="à trancher" onClick={() => aller('decisions')} />
            <Tuile icone={<Lightbulb size={26} strokeWidth={1.5} />} mot="Idées" nombre={aEssayer.length} detail="à essayer" onClick={() => aller('idees')} />
            <Tuile icone={<Handshake size={26} strokeWidth={1.5} />} mot="Opportunités" nombre={enCours.length} detail="en cours" onClick={() => aller('opportunites')} />
            <Tuile icone={<Hammer size={26} strokeWidth={1.5} />} mot="Chantiers" nombre={attendGo.length} detail="attendent ton go" onClick={() => aller('chantiers')} />
          </div>
          <div className={`${carte} mt-3 flex items-center justify-between gap-3`}>
            <div className="flex items-center gap-3">
              <Moon size={24} strokeWidth={1.5} aria-hidden />
              <div>
                <p className="text-[17px] font-bold">Nuit</p>
                <p className="text-[15px]" style={{ color: 'var(--ink-2)' }}>{nuitAFaire.length} tâche{nuitAFaire.length > 1 ? 's' : ''} prévue{nuitAFaire.length > 1 ? 's' : ''}</p>
              </div>
            </div>
            <button type="button" className={`btn-plein ${action}`} onClick={() => { setNuitOuverte(true); aller('chantiers') }}>
              Pour cette nuit
            </button>
          </div>
        </>
      )}

      {ecran !== 'accueil' && (
        <button type="button" onClick={() => aller('accueil')} className={`btn-contour ${choix} mb-4 gap-2`}>
          <ArrowLeft size={18} aria-hidden /> Accueil
        </button>
      )}

      {ecran === 'decisions' && <Decisions liste={d.decisions} onRepondre={repondre} />}
      {ecran === 'idees' && <Idees liste={d.idees} onTrancher={trancherIdee} />}
      {ecran === 'opportunites' && <Opportunites liste={d.opportunites} onStatut={statutOpp} onAjouter={ajouterOpp} />}
      {ecran === 'chantiers' && (
        <Chantiers d={d} nuitOuverte={nuitOuverte} setNuitOuverte={setNuitOuverte} onAjouter={ajouterNuit} />
      )}

      {message && (
        <div
          role="status"
          className="fixed inset-x-4 z-50 mx-auto max-w-[440px] rounded-full px-5 py-3 text-center text-[16px] font-bold text-white"
          style={{ bottom: 'calc(16px + env(safe-area-inset-bottom))', backgroundColor: 'var(--g-950)' }}
        >
          {message}
        </div>
      )}
    </Cadre>
  )
}

/* ---------------------------------------------------------------- cadre */

function Cadre({ children, onActualiser, maj, demo }: { children: React.ReactNode; onActualiser: () => void; maj: string; demo?: boolean }) {
  return (
    <div
      className="min-h-dvh"
      style={{ backgroundColor: 'var(--surface-3)', color: 'var(--ink)', paddingBottom: 'calc(88px + env(safe-area-inset-bottom))' }}
    >
      <header
        className="bg-white"
        style={{ paddingTop: 'env(safe-area-inset-top)', boxShadow: 'var(--ombre-carte)' }}
      >
        <div className="mx-auto flex h-[68px] max-w-[640px] items-center justify-between gap-3 px-4">
          <Image src="/logo/logotype.svg" alt="123digital" width={210} height={43} unoptimized style={{ height: 43, width: 'auto' }} priority />
          <button type="button" onClick={onActualiser} className={`btn-contour btn-sans-fleche ${choix} gap-2`} aria-label="Actualiser">
            <RefreshCw size={18} aria-hidden /> Actualiser
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-[640px] px-4 pt-4">
        <p className="mb-3 text-[14px]" style={{ color: 'var(--ink-2)' }}>
          {demo ? 'Démonstration, données fictives. ' : ''}
          {maj ? `Synchro du PC : ${dateCourte(maj)}` : ''}
        </p>
        {children}
      </main>
    </div>
  )
}

function Panne({ etat }: { etat: string }) {
  const textes: Record<string, string> = {
    cle: 'Ce lien n’ouvre plus l’Espace. Demande le nouveau lien à Claude.',
    branchement: 'La feuille n’est pas encore branchée. Il reste à autoriser le script Google une fois.',
    reseau: 'Pas de réseau ou Google ne répond pas. Les données affichées peuvent dater.',
  }
  return (
    <p className="flex items-start gap-2 text-[16px]">
      <CircleAlert size={20} className="mt-0.5 shrink-0" style={{ color: 'var(--alerte)' }} aria-hidden />
      {textes[etat] ?? textes.reseau}
    </p>
  )
}

function Tuile({ icone, mot, nombre, detail, onClick }: { icone: React.ReactNode; mot: string; nombre: number; detail: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${carte} flex min-h-[148px] flex-col items-start justify-between text-left transition duration-150 active:scale-[0.97]`}
    >
      <span className="flex w-full items-center justify-between">
        {icone}
        <span className="text-[34px] font-extrabold leading-none" style={{ color: nombre ? 'var(--brand)' : 'var(--ink-2)' }}>{nombre}</span>
      </span>
      <span>
        <span className="block text-[18px] font-bold">{mot}</span>
        <span className="block text-[14px]" style={{ color: 'var(--ink-2)' }}>{detail}</span>
      </span>
    </button>
  )
}

function Titre({ icone, texte, nombre }: { icone: React.ReactNode; texte: string; nombre?: number }) {
  return (
    <h1 className="mb-3 flex items-center gap-2 text-[24px] font-extrabold">
      {icone} {texte}
      {nombre !== undefined && <span style={{ color: 'var(--ink-2)' }}>· {nombre}</span>}
    </h1>
  )
}

/* Choix exclusifs en pilules, sur une ligne qui glisse si elle déborde (jamais de liste déroulante). */
function Onglets<T extends string>({ valeurs, actif, onChange }: { valeurs: [T, string][]; actif: T; onChange: (v: T) => void }) {
  return (
    <div className="-mx-4 mb-4 flex gap-2 overflow-x-auto px-4 pb-1">
      {valeurs.map(([v, libelle]) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          aria-pressed={actif === v}
          className={`${actif === v ? 'btn-plein' : 'btn-contour'} ${choix} shrink-0 bg-white`}
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

/* ---------------------------------------------------------------- Décisions */

function Decisions({ liste, onRepondre }: { liste: Decision[]; onRepondre: (d: Decision, l: string) => void }) {
  const [vue, setVue] = useState<'ouvertes' | 'repondues'>('ouvertes')
  const [changer, setChanger] = useState('')
  const ouvertes = liste.filter((x) => !x.reponse).sort((a, b) => (a.gravite === 'grave' ? -1 : 0) - (b.gravite === 'grave' ? -1 : 0))
  const repondues = liste.filter((x) => x.reponse)
  const montrees = vue === 'ouvertes' ? ouvertes : repondues
  return (
    <>
      <Titre icone={<Signpost size={24} strokeWidth={1.5} />} texte="Décisions" />
      <Onglets valeurs={[['ouvertes', `À trancher · ${ouvertes.length}`], ['repondues', `Répondu · ${repondues.length}`]]} actif={vue} onChange={setVue} />
      {!montrees.length && <Vide texte={vue === 'ouvertes' ? 'Rien à trancher. Le bras droit repasse demain matin.' : 'Aucune réponse pour l’instant.'} />}
      <div className="flex flex-col gap-3">
        {montrees.map((dec) => {
          const choisie = dec.options.find((o) => o.lettre === dec.reponse)
          const ouverte = !dec.reponse || changer === dec.id
          return (
            <article key={dec.id} className={carte}>
              <div className="mb-2 flex items-center justify-between gap-2 text-[14px] font-bold uppercase tracking-wide">
                <span style={{ color: dec.gravite === 'grave' ? 'var(--alerte)' : 'var(--ink-2)' }}>{dec.gravite === 'grave' ? 'Grave' : 'Utile'}</span>
                {dec.reponse && (
                  <span className="flex items-center gap-1 normal-case tracking-normal" style={{ color: 'var(--brand)' }}>
                    {dec.reponse === 'plus-tard' ? <Clock size={16} aria-hidden /> : <Check size={16} aria-hidden />}
                    {dec.reponse === 'plus-tard' ? 'Plus tard' : `Choix ${dec.reponse}`}
                  </span>
                )}
              </div>
              <p className="text-[18px] font-bold leading-snug">{dec.question}</p>
              {dec.reponse && choisie && changer !== dec.id && <p className="mt-2 text-[16px]">Tu as choisi : {choisie.texte}</p>}
              {ouverte && (
                <div className="mt-4 flex flex-col gap-2">
                  {dec.options.map((o) => (
                    <button
                      key={o.lettre}
                      type="button"
                      onClick={() => { onRepondre(dec, o.lettre); setChanger('') }}
                      className={`${o.recommande ? 'btn-plein' : 'btn-contour'} ${choix} !w-full !whitespace-normal !justify-start text-left`}
                    >
                      <span className="font-extrabold">{o.lettre}</span>
                      <span className="flex-1">{o.texte}</span>
                      {o.recommande && <span className="text-[13px] font-semibold opacity-90">conseillé</span>}
                    </button>
                  ))}
                  <button type="button" onClick={() => { onRepondre(dec, 'plus-tard'); setChanger('') }} className={`btn-contour ${choix} !w-full gap-2`}>
                    <Clock size={18} aria-hidden /> Plus tard
                  </button>
                </div>
              )}
              {dec.reponse && changer !== dec.id && (
                <button type="button" onClick={() => setChanger(dec.id)} className={`btn-contour ${choix} mt-3`}>Changer</button>
              )}
              {dec.source && <p className="mt-3 text-[13px]" style={{ color: 'var(--ink-2)' }}>Source : {dec.source}</p>}
            </article>
          )
        })}
      </div>
    </>
  )
}

/* ---------------------------------------------------------------- Idées R&D */

const STATUTS_IDEE: [string, string][] = [['à essayer', 'À essayer'], ['en essai', 'En essai'], ['adopté', 'Adopté'], ['refusé', 'Refusé']]

function Idees({ liste, onTrancher }: { liste: Idee[]; onTrancher: (i: Idee, oui: boolean) => void }) {
  const [vue, setVue] = useState('à essayer')
  const montrees = liste.filter((x) => x.statut === vue).reverse()
  return (
    <>
      <Titre icone={<Lightbulb size={24} strokeWidth={1.5} />} texte="Idées R&D" />
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
            {i.statut === 'à essayer' && (
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button type="button" onClick={() => onTrancher(i, true)} className={`btn-plein ${choix} !w-full gap-2`}>
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
      <Titre icone={<Handshake size={24} strokeWidth={1.5} />} texte="Opportunités" />
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
    if (quoi.trim().length < 2) return
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
          {Object.entries(QUAND).map(([v, l]) => (
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

/* ---------------------------------------------------------------- Chantiers et nuit */

const ETATS: [string, string][] = [['attend-go', 'Attend ton go'], ['avance', 'Avance'], ['bloque', 'Bloqué']]

function Chantiers({
  d, nuitOuverte, setNuitOuverte, onAjouter,
}: { d: Donnees; nuitOuverte: boolean; setNuitOuverte: (b: boolean) => void; onAjouter: (t: string) => Promise<boolean> }) {
  const [tache, setTache] = useState('')
  const [envoi, setEnvoi] = useState(false)
  const envoyer = async (e: React.FormEvent) => {
    e.preventDefault()
    if (tache.trim().length < 3) return
    setEnvoi(true)
    const ok = await onAjouter(tache.trim())
    setEnvoi(false)
    if (ok) { setTache(''); setNuitOuverte(false) }
  }
  return (
    <>
      <Titre icone={<Hammer size={24} strokeWidth={1.5} />} texte="Chantiers et nuit" />
      {ETATS.map(([etat, libelle]) => {
        const l = d.chantiers.filter((c) => c.etat === etat)
        if (!l.length) return null
        return (
          <section key={etat} className="mb-4">
            <h2 className="mb-2 text-[16px] font-bold uppercase tracking-wide" style={{ color: etat === 'bloque' ? 'var(--alerte)' : 'var(--ink-2)' }}>
              {libelle} · {l.length}
            </h2>
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
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-[20px] font-extrabold"><Moon size={22} strokeWidth={1.5} aria-hidden /> Cette nuit</h2>
          {!nuitOuverte && (
            <button type="button" onClick={() => setNuitOuverte(true)} className={`btn-plein ${action} gap-2`}>
              <Plus size={18} aria-hidden /> Ajouter
            </button>
          )}
        </div>
        {nuitOuverte && (
          <form onSubmit={envoyer} className="mb-4 flex flex-col gap-3">
            <label className="block">
              <span className="mb-1 block text-[15px] font-bold">Pour cette nuit, en une phrase</span>
              <textarea
                value={tache}
                onChange={(e) => setTache(e.target.value)}
                rows={3}
                maxLength={300}
                autoFocus
                placeholder="Client ou sujet : ce qu’il faut faire"
                className="w-full rounded-[var(--radius-ctrl)] border bg-white px-4 py-3 text-[17px]"
                style={{ borderColor: 'var(--g-500)', color: 'var(--ink)' }}
              />
            </label>
            <div className="flex gap-2">
              <button type="submit" disabled={envoi || tache.trim().length < 3} className={`btn-plein ${action} gap-2`}>
                <Send size={18} aria-hidden /> Envoyer
              </button>
              <button type="button" onClick={() => setNuitOuverte(false)} className={`btn-contour ${choix} gap-2`}>
                <X size={18} aria-hidden /> Fermer
              </button>
            </div>
          </form>
        )}
        {!d.nuit.length && <p className="text-[16px]" style={{ color: 'var(--ink-2)' }}>Rien de prévu.</p>}
        <ul className="flex flex-col">
          {[...d.nuit].reverse().map((n) => (
            <li key={n.id} className="flex items-start gap-3 border-t py-3 first:border-t-0" style={{ borderColor: 'var(--line)' }}>
              {n.fait ? <Check size={20} className="mt-0.5 shrink-0" style={{ color: 'var(--brand)' }} aria-label="Fait" /> : <Moon size={20} strokeWidth={1.5} className="mt-0.5 shrink-0" aria-label="À faire" />}
              <span className="flex-1 text-[16px]" style={{ color: n.fait ? 'var(--ink-2)' : 'var(--ink)' }}>
                {n.tache}
                {n.origine === 'téléphone' && <span className="block text-[13px]" style={{ color: 'var(--ink-2)' }}>Envoyé du téléphone, arrive au PC à la prochaine synchro</span>}
              </span>
              <span className="shrink-0 text-[14px] font-bold" style={{ color: n.fait ? 'var(--brand)' : 'var(--ink-2)' }}>{n.fait ? 'Fait' : 'À faire'}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
