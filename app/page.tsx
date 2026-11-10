"use client";
import { useEffect, useRef, useState } from "react";
import Hero from "@/components/hero/Hero";
import { CTA, NAV, PHONE } from "@/lib/content";
import { PhoneIcon, MailIcon, MapPinIcon, InstagramIcon, CompassIcon, SparklesIcon, MessageIcon, MonitorIcon, TrendingUpIcon, SearchIcon, TargetIcon, LayersIcon, RocketIcon, UsersIcon, ZapIcon, HeartIcon } from "@/components/ui/Icons";
import { anchorClick } from "@/lib/lenis";
import "./site.css";

const services = [
  { n:"01", Icon:CompassIcon, title:"Brand Strategy", text:"Positioning, audience thinking and a clear point of view — so the brand knows what it stands for before it starts speaking.", tags:["Positioning","Messaging","Brand direction"] },
  { n:"02", Icon:SparklesIcon, title:"Creative & Campaigns", text:"Big ideas translated into campaigns with a visual language people can recognise, remember and actually want to share.", tags:["Campaign concepts","Art direction","Launches"] },
  { n:"03", Icon:MessageIcon, title:"Social & Content", text:"Content systems built around real behaviour — not a calendar full of filler. Strategy, stories and formats that earn attention.", tags:["Social strategy","Content systems","Copy & design"] },
  { n:"04", Icon:MonitorIcon, title:"Web & Digital", text:"Websites that make the brand feel as considered online as it does on paper. Clear journeys, sharp storytelling and purposeful motion.", tags:["Web design","UX direction","Digital experiences"] },
  { n:"05", Icon:TrendingUpIcon, title:"Growth & Performance", text:"Creative and performance working together — from paid campaigns to conversion thinking and the details that turn interest into action.", tags:["Paid media","Conversion","Analytics"] },
];

const work = [
  { type:"Brand world", title:"A brand people can feel before they understand it.", cat:"Identity / Strategy", tone:"clay" },
  { type:"Digital experience", title:"A quieter interface for a louder idea.", cat:"Web / Experience", tone:"espresso" },
  { type:"Campaign", title:"From one sharp thought to a whole visual language.", cat:"Campaign / Content", tone:"terracotta" },
];

const team = [
  { name:"Devanshi Mehta", role:"Founder", photo:"/team/devanshi-mehta.jpg" },
  { name:"Vishal Rathore", role:"Co-Founder", photo:"/team/vishal-rathore.jpg" },
  { name:"Shruti", role:"Full Stack Developer", photo:"/team/shruti.jpg" },
  { name:"Pearl Chaudhary", role:"Frontend Developer & UI/UX Designer", photo:"/team/pearl-chaudhary.jpg" },
];

const testimonials = [
  { quote:"They didn't just make us look better. They helped us understand what we were trying to say.", name:"Client testimonial", role:"Brand & growth partner" },
  { quote:"The best part was how considered every detail felt — from the first idea to the final interaction.", name:"Client testimonial", role:"Creative collaboration" },
];

const faqs = [
  ["What kind of clients do you work with?", "We work with founders, growing businesses and teams that care about how their brand is understood. The common thread is ambition and a willingness to do things thoughtfully."],
  ["Do you only handle social media?", "No. Social can be part of the answer, but we start with the bigger picture: positioning, identity, campaigns, content, web and the digital touchpoints around them."],
  ["Can you work with an existing brand?", "Absolutely. We can build from what already exists, refine the system or rethink the parts that are holding the brand back."],
  ["How does a project usually start?", "With a conversation. We learn what you are building, what is not working and what success needs to look like. From there we shape the right scope instead of forcing a package."],
  ["Do you offer ongoing retainers?", "Yes. For brands that need a long-term creative partner, we can build an ongoing rhythm across strategy, content, campaigns and digital."],
];

function Reveal({ children, className="" }: {children: React.ReactNode; className?:string}) {
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{ const el=ref.current;if(!el)return; const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){el.classList.add("is-visible");io.disconnect()}},{threshold:.12});io.observe(el);return()=>io.disconnect()},[]);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function SectionHead({ eyebrow,title,copy }: {eyebrow:string;title:string;copy:string}){
 return <div className="section-head"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><p className="section-head__copy">{copy}</p></div>
}

function FAQ(){const [open,setOpen]=useState<number|null>(0);return <div className="faq-list">{faqs.map(([q,a],i)=><div className={`faq ${open===i?"open":""}`} key={q}><button onClick={()=>setOpen(open===i?null:i)} aria-expanded={open===i}><span>{q}</span><b>{open===i?"−":"+"}</b></button><div className="faq__answer"><p>{a}</p></div></div>)}</div>}

export default function Home(){return <>
 <Hero/>
 <section className="statement"><Reveal><p className="eyebrow">AIdentityHaus / what we believe</p><h2>Good marketing isn't louder.<br/><em>It's more precise.</em></h2></Reveal></section>
 <section id="services" className="section services"><div className="section-grid"><SectionHead eyebrow="02 / Services" title="The thinking behind the work." copy="We bring strategy, creative, content and digital together so the brand feels like one considered idea — not six disconnected services."/><div className="service-list">{services.map((s)=><Reveal key={s.n}><article className="service-row"><span className="service-row__num">{s.n}</span><div><span className="icon-badge" aria-hidden="true"><s.Icon size={22}/></span><h3>{s.title}</h3><p>{s.text}</p><div className="tags">{s.tags.map(t=><span key={t}>{t}</span>)}</div></div><span className="service-row__arrow">↗</span></article></Reveal>)}</div></div></section>
 <section id="work" className="section work"><div className="work-intro"><SectionHead eyebrow="03 / Our Work" title="Built to be remembered." copy="A selection of the kind of thinking we like to put into the world. Replace these with your real case studies when you're ready."/><a className="text-link" href="#contact">Start a project <span>↗</span></a></div><div className="work-grid">{work.map((w,i)=><Reveal key={w.title} className={`work-card work-card--${w.tone}`}><div className="work-card__art"><span className="art-index">0{i+1}</span><div className="art-ring"/><div className="art-line"/><div className="art-word">{i===0?"FORM":i===1?"FLOW":"VOICE"}</div></div><div className="work-card__meta"><span>{w.cat}</span><h3>{w.title}</h3><span>View case study ↗</span></div></Reveal>)}</div></section>
 <section className="about-band"><Reveal><div><p className="eyebrow">04 / About AIdentityHaus</p><h2>Small enough to care.<br/><em>Sharp enough to matter.</em></h2></div><p>We are a creative partner for brands that don't want to look like everyone else. We find the central idea, build the system around it and make sure it survives every touchpoint — from a first impression to a long-term relationship.</p></Reveal></section>
 <section id="process" className="section process"><div className="process-intro"><SectionHead eyebrow="05 / The Identity System" title="From idea to identity." copy="A clear process keeps the creative ambitious and the work grounded. We move through five stages, with strategy and feedback shaping every one."/><a className="text-link text-link--dark" href="#contact">See how we work <span>↗</span></a></div><div className="process-steps">{[["01","Discover","We understand the business, audience and opportunity.",SearchIcon],["02","Define","We find the positioning, message and point of view.",TargetIcon],["03","Design","We build the visual and verbal system around the idea.",LayersIcon],["04","Deploy","We take the identity into campaigns, content and digital.",RocketIcon],["05","Grow","We learn from what works and refine what comes next.",TrendingUpIcon]].map(([n,t,d,I])=>{const Icon=I as typeof SearchIcon;return <Reveal key={n as string}><article className="process-step"><span>{n as string}</span><div><span className="icon-badge" aria-hidden="true"><Icon size={22}/></span><h3>{t as string}</h3><p>{d as string}</p></div><b>↗</b></article></Reveal>})}</div><div className="process-after"><span>AFTER YOU CONTACT US</span><p>Brief → Discovery call → Strategy + proposal → Kickoff → Execution</p></div></section>
 <section className="why"><div className="why__head"><p className="eyebrow">06 / Why the Haus?</p><h2>Beautiful is good.<br/><em>Effective is better.</em></h2></div><div className="why-grid">{[["DIRECT","You work with the people building the strategy.",UsersIcon],["STRATEGIC","Every creative decision starts with a business objective.",TargetIcon],["CREATIVE","We don't believe every brand needs the same template.",SparklesIcon],["PERFORMANCE-LED","The work should earn attention and move something forward.",ZapIcon],["PERSONAL","Your brand gets a considered partner, not a ticket number.",HeartIcon]].map(([t,d,I],i)=>{const Icon=I as typeof UsersIcon;return <Reveal key={t as string}><article><span>0{i+1}</span><span className="icon-badge icon-badge--why" aria-hidden="true"><Icon size={22}/></span><h3>{t as string}</h3><p>{d as string}</p></article></Reveal>})}</div></section>
 <section id="team" className="section team"><SectionHead eyebrow="05 / Our Team" title="Different disciplines. One point of view." copy="A small, collaborative team with strategy, creative, content and digital thinking close to the work."/><div className="team-grid">{team.map((m,i)=><Reveal key={m.name}><article className="team-card"><div className="team-card__photo"><img src={m.photo} alt={`${m.name}, ${m.role}`} loading="lazy" width={800} height={1000}/><span className="team-card__num">0{i+1}</span></div><h3>{m.name}</h3><p>{m.role}</p></article></Reveal>)}</div></section>
 <section id="testimonials" className="section testimonials"><SectionHead eyebrow="07 / Testimonials" title="Nice words are lovely. Results are better." copy="A place for the voices of the people we've built with. Add your real client testimonials here before launch."/><div className="quote-grid">{testimonials.map((t,i)=><Reveal key={i}><blockquote><span className="quote-mark">“</span><p>{t.quote}</p><footer><strong>{t.name}</strong><span>{t.role}</span></footer></blockquote></Reveal>)}</div></section>
 <section className="notes section"><div className="notes-head"><SectionHead eyebrow="08 / Haus Notes" title="Ideas worth keeping." copy="Short observations on branding, social, performance and digital — written to be useful, not to fill a blog."/><a className="text-link text-link--dark" href="#contact">Start a conversation <span>↗</span></a></div><div className="notes-grid">{[["BRANDING","Your brand doesn't need another logo.","Clarity first. Identity second."],["SOCIAL","Why posting every day isn't a strategy.","Consistency matters. So does a point of view."],["PERFORMANCE","Where should your first marketing budget go?","Start with the bottleneck, not the platform."],["DIGITAL","A website should do more than look good.","It should make the next step obvious."]].map(([cat,title,desc],i)=><Reveal key={title}><article className="note-card"><div><span>{cat}</span><small>0{i+1}</small></div><h3>{title}</h3><p>{desc}</p><a href="#contact">Read the note <span>↗</span></a></article></Reveal>)}</div></section>
 <section className="faq section"><SectionHead eyebrow="09 / FAQs" title="A few things you're probably wondering." copy="If your question isn't here, bring it to the first conversation."/><FAQ/></section>
 <section id="contact" className="contact"><div className="contact__top"><p className="eyebrow">10 / Contact</p><span>Let's make something<br/>worth remembering.</span></div><h2>Have a good idea?<br/><em>Let's give it a life.</em></h2><a className="contact__cta" href={CTA.href}><PhoneIcon size={22}/> Schedule a Discovery Call</a><div className="contact__details"><div><span><PhoneIcon size={15}/> Call</span><a href={CTA.href}>{PHONE.display}</a></div><div><span><MailIcon size={15}/> Email</span><a href="mailto:hello@aidentityhaus.com">hello@aidentityhaus.com</a></div><div><span><MapPinIcon size={15}/> Based in</span><p>Vadodara, India / working everywhere</p></div><div><span><InstagramIcon size={15}/> Instagram</span><p>@aidentityhaus</p></div></div></section>
 <footer className="footer"><div className="footer__brand"><img className="footer__mark" src="/logo-icon.png" width={420} height={269} alt=""/>AIdentityHaus<span>Creative studio for brands with a point of view.</span></div><div className="footer__links">{NAV.map(n=><a key={n.href} href={n.href} onClick={(e)=>anchorClick(e,n.href)}>{n.label}</a>)}</div><span>© {new Date().getFullYear()} AIdentityHaus</span></footer>
 </>}
