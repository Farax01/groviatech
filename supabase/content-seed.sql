-- Loads the team, projects and testimonials that are on the site today. Run once, after content.sql.
-- Testimonials load as unpublished with permission not yet confirmed: tick the box in the admin once each client has agreed.

insert into public.team_members (name, role, note, link_label, link_href, sort_order)
select * from (values
  ($q$Fouad Aransi$q$, $q$Founder and CEO$q$, $q$ISC2 Certified in Cybersecurity (CC)$q$, null, null, 10),
  ($q$Abdulmalik Adebayo$q$, $q$Application security engineer$q$, null, $q$Read his write-ups$q$, $q$https://medium.com/@abdulmalikadebayo$q$, 20),
  ($q$Feranmi Akinsanya$q$, $q$Head of Software$q$, null, null, null, 30)
) as v(name, role, note, link_label, link_href, sort_order)
where not exists (select 1 from public.team_members);

insert into public.projects (domain, category, description, tags, sort_order) values
  ($q$tc-janitorial.com$q$, $q$Local business$q$, $q$A professional website for a commercial cleaning service, built for trust, clarity and easy contact, and set up to win local search.$q$, array[$q$WordPress$q$, $q$Local SEO$q$, $q$LiteSpeed$q$, $q$CRO$q$]::text[], 50),
  ($q$pmvmeme.com$q$, $q$Web3, meme coin$q$, $q$A full-featured Solana meme coin site with live DexScreener price stats, a canvas-based meme generator, a browser mini-game, wallet integration and a tokenomics display.$q$, array[$q$Solana$q$, $q$Web3$q$, $q$DexScreener API$q$, $q$Canvas$q$]::text[], 10),
  ($q$tedxosogbo.com.ng$q$, $q$Event platform$q$, $q$Major contributor to the official TEDxOsogbo event platform, built to handle event information, speaker showcases and community engagement at scale.$q$, array[$q$Web development$q$, $q$Event platform$q$, $q$Community$q$, $q$Performance$q$]::text[], 20),
  ($q$margimarketing.com$q$, $q$Marketing agency$q$, $q$A full agency website for a marketing firm, built to show the agency’s own design credibility while converting leads effectively.$q$, array[$q$Next.js$q$, $q$React$q$, $q$Lead gen$q$, $q$SEO$q$]::text[], 30),
  ($q$elan.crelivio.com$q$, $q$Web platform$q$, $q$A polished web platform for Crelivio’s flagship product line, focused on clean UX, a conversion-optimized layout and performance across all devices.$q$, array[$q$Next.js$q$, $q$React$q$, $q$Performance$q$, $q$CRO$q$]::text[], 40)
on conflict (domain) do nothing;

insert into public.testimonials (quote, name, role, sort_order, published, permission_confirmed)
select * from (values
  ($q$Brooo. Your work on the website is looking niiiice! thank you for helping.$q$, $q$PMV Owner$q$, $q$PMV Meme, Web3 project$q$, 10, false, false),
  ($q$Fouad i did check very good job!!!! Start Looks good.$q$, $q$Amit Margi$q$, $q$Top Cleaning$q$, 20, false, false),
  ($q$Just heard from the leaders and they’re genuinely impressed with what we pulled off. That’s a big win guys! Honestly, thank you!$q$, $q$Obanijesu$q$, $q$TEDxOsogbo, event platform$q$, 30, false, false),
  ($q$They were fast, strategic, and technical without the usual agency fluff. The end result was clean, clear, and conversion-focused.$q$, $q$Adebayo$q$, $q$Software delivery$q$, 40, false, false)
) as v(quote, name, role, sort_order, published, permission_confirmed)
where not exists (select 1 from public.testimonials);
