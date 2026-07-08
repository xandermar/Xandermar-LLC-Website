---
title: Contact Us
layout: default
permalink: /contact-us
nav_order: 4
calendy_id: xandermarllc
hero_image: /assets/images/contact.png
hero_image_alt: Contact page banner for scheduling consultations and project inquiries with Xandermar LLC
hero_image_class: page-hero-image-contact
faqs:
  - question: How quickly do you respond to new inquiries?
    answer: We typically respond to new inquiries within one business day with practical next steps or a request for any missing details.
  - question: What happens during the free AI consultation?
    answer: The free AI consultation is a no-pressure strategy call where we review your goals, current workflow, and the best automation opportunities for your business.
  - question: Do you only work with Delaware clients?
    answer: No. Xandermar is based in Delaware, serves clients across the United States remotely, and can provide on-site support in Delaware and nearby Mid-Atlantic regions when needed.
---

{% include hero.md %}

<section class="contact-intro card border-0 mb-4">
	<div class="card-body p-4 p-lg-5">
		<h1 class="h3 mb-3">Let&#39;s Build Something Smarter</h1>
		<p class="mb-0">Tell us what you need and we will respond quickly with practical next steps. Whether you need AI automation, Drupal support, or a full website rebuild, Xandermar LLC is ready to help.</p>
	</div>
</section>

<section class="contact-layout mb-4">
	<div class="contact-primary card h-100 border-0">
		<div class="card-body p-4">
			<h2 class="h4 mb-3">Send a Message</h2>
			<p class="small mb-4">Use this form for project inquiries, support questions, or to request a quote.</p>

			<form class="row g-3" action="https://formsubmit.co/{{ site.email_hash }}" method="POST">
				<input type="hidden" name="_subject" value="New contact request from xandermar.com">
				<input type="hidden" name="_captcha" value="false">
				<input type="hidden" name="_template" value="table">
				<input type="text" name="_honey" class="d-none" tabindex="-1" autocomplete="off">

				<div class="col-md-6">
					<label for="contactName" class="form-label">Name</label>
					<input type="text" class="form-control" id="contactName" name="name" required>
				</div>

				<div class="col-md-6">
					<label for="contactCompany" class="form-label">Company</label>
					<input type="text" class="form-control" id="contactCompany" name="company">
				</div>

				<div class="col-md-6">
					<label for="contactEmail" class="form-label">Email</label>
					<input type="email" class="form-control" id="contactEmail" name="email" required>
				</div>

				<div class="col-md-6">
					<label for="contactPhone" class="form-label">Phone</label>
					<input type="tel" class="form-control" id="contactPhone" name="phone">
				</div>

				<div class="col-12">
					<label for="contactService" class="form-label">Service Needed</label>
					<select class="form-select" id="contactService" name="service" required>
						<option value="" selected disabled>Select a service</option>
						<option value="AI Assistant">AI Assistant</option>
						<option value="Drupal Development">Drupal Development</option>
						<option value="Web Design and Hosting">Web Design and Hosting</option>
						<option value="Migration or Upgrade">Migration or Upgrade</option>
						<option value="Other">Other</option>
					</select>
				</div>

				<div class="col-12">
					<label for="contactMessage" class="form-label">Project Details</label>
					<textarea class="form-control" id="contactMessage" name="message" rows="5" required></textarea>
				</div>

				<div class="col-12 d-grid d-sm-flex gap-2 align-items-center">
					<button type="submit" class="btn btn-primary">Send Message</button>
					<small class="text-muted">We typically respond within 1 business day.</small>
				</div>
			</form>
		</div>
	</div>

	<aside class="contact-secondary d-grid gap-3">
		<div class="card border-0">
			<div class="card-body p-4">
				<h2 class="h5 mb-3">Contact Details</h2>
				<p class="mb-2"><strong>Email:</strong> <a href="mailto:{{ site.email }}">{{ site.email }}</a></p>
				<p class="mb-2"><strong>Phone:</strong> <a href="tel:+13023288855">(302) 328-8855</a></p>
				<p class="mb-0"><strong>Location:</strong> Milton, Delaware</p>
			</div>
		</div>

		<div class="card border-0 contact-consult-card">
			<div class="card-body p-4">
				<h2 class="h5 mb-2">Schedule Free AI Consultation</h2>
				<p class="mb-3">Book a no-pressure discovery call to review goals, current workflow, and how AI can reduce missed leads.</p>
				<a class="btn btn-primary w-100" href="#free-ai-consultation">Book Your Free Consultation</a>
			</div>
		</div>

		<div class="card border-0">
			<div class="card-body p-4">
				<h2 class="h5 mb-2">Service Area</h2>
				<p class="mb-0">Proudly based in Delaware and serving clients across the United States through remote collaboration, plus on-site support in Delaware and nearby Mid-Atlantic regions when needed.</p>
			</div>
		</div>

		<div class="card border-0">
			<div class="card-body p-4">
				<h2 class="h5 mb-2">Why Teams Trust Xandermar</h2>
				<ul class="contact-trust-list mb-0">
					<li>Established in 2010 with enterprise and public-sector delivery experience.</li>
					<li>Direct communication with experienced consultants, not outsourced call centers.</li>
					<li>Clear timelines, transparent recommendations, and maintainable solutions.</li>
				</ul>
			</div>
		</div>
	</aside>
</section>

<section id="free-ai-consultation" class="card border-0">
	<div class="card-body p-4 p-lg-5">
		<h2 class="h4 mb-3">Free AI Consultation Booking</h2>
		<p class="mb-4">Choose a time that works for you and we will prepare the call around your goals before we meet.</p>
		<!-- Calendly inline widget begin -->
		<div class="calendly-inline-widget calendly-widget" data-url="https://calendly.com/{{ page.calendy_id }}/chat"></div>
		<script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
		<!-- Calendly inline widget end -->
	</div>
</section>

<section class="card border-0 mt-4">
	<div class="card-body p-4 p-lg-5">
		<h2 class="h4 mb-4">Frequently Asked Questions</h2>
		<div class="mb-4">
			<h3 class="h5">How quickly do you respond to new inquiries?</h3>
			<p class="mb-0">We typically respond to new inquiries within one business day with practical next steps or a request for any missing details.</p>
		</div>
		<div class="mb-4">
			<h3 class="h5">What happens during the free AI consultation?</h3>
			<p class="mb-0">The free AI consultation is a no-pressure strategy call where we review your goals, current workflow, and the best automation opportunities for your business.</p>
		</div>
		<div>
			<h3 class="h5">Do you only work with Delaware clients?</h3>
			<p class="mb-0">No. Xandermar is based in Delaware, serves clients across the United States remotely, and can provide on-site support in Delaware and nearby Mid-Atlantic regions when needed.</p>
		</div>
	</div>
</section>
