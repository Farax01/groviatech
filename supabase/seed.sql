-- Starting pricing tiers. Edit everything later from /admin/pricing.
insert into public.pricing_tiers
  (track, name, price_prefix, price_label, price_suffix, audience, features, highlighted, highlight_label, sort_order)
values
  ('web_dev','Launch','from','$1,500',null,'A secure brochure site for a small business',
    array['Up to 5 pages','Hardened setup, SSL and security headers','14 days of support'],false,null,10),
  ('web_dev','Secure Business','from','$3,500',null,'Sites that take payments, bookings or customer data',
    array['Forms, payments, bookings or customer data','Pre-launch security review with a written report','30 days of support'],true,'Most chosen',20),
  ('web_dev','Platform','from','$6,500',null,'Portals, e-commerce and integrations',
    array['Portals, e-commerce and integrations','Independent pentest by our security team','90 days of support'],false,null,30),

  ('sme_security','Security Check',null,'$900','one-time','Find out where your current site is exposed',
    array['Audit of your existing site','Misconfigurations, outdated software, exposed data, payment and form risks','Plain-English report with a risk rating'],false,null,10),
  ('sme_security','Fix & Harden','from','$1,800','one-time','We fix what the audit finds',
    array['Fixes for every issue in your Security Check','Re-scan confirming the fixes'],true,'Most chosen',20),
  ('sme_security','Secure Care',null,'$249','/mo','Ongoing protection after launch',
    array['Monitoring and patching','Backups','Quarterly scan','Monthly summary'],false,null,30),

  ('ai_startup','Essential',null,'$3,000',null,'One web app, tested manually',
    array['1 web app','Manual, OWASP-aligned testing','Report with remediation guidance','1 free retest','About 1–2 weeks'],false,null,10),
  ('ai_startup','Comprehensive',null,'$4,800',null,'Web app and API, tested in depth',
    array['Web app and API','Authentication, business-logic and access-control depth','Report and walkthrough call','1 free retest','About 2–3 weeks'],true,'Most chosen',20),
  ('ai_startup','Ongoing',null,'Custom',null,'Several apps, tested on a schedule',
    array['Multiple apps, recurring','Quarterly tests','Reports and a live finding tracker','Retests included'],false,null,30);
