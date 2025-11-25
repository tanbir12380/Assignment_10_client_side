import React from 'react';
import { Zap, ShieldCheck, BarChart3, Clock } from "lucide-react";
const WhyChooseUs = () => {
  return (
  <section className="values-section">
<h2 className="values-title">Why Choose Us?</h2>


<div className="values-grid">
<div className="value-card">
<div className="value-icon"><Zap size={40} /></div>
<h3 className="value-heading">Fast Payments</h3>
<p className="value-text">
Pay all your utility bills—internet, gas, water, and electricity—quickly and without any physical queues.
</p>
</div>


<div className="value-card">
<div className="value-icon"><ShieldCheck size={40} /></div>
<h3 className="value-heading">Secure Platform</h3>
<p className="value-text">
Your personal and billing information is protected with strong encryption and modern security standards.
</p>
</div>


<div className="value-card">
<div className="value-icon"><BarChart3 size={40} /></div>
<h3 className="value-heading">Smart Tracking</h3>
<p className="value-text">
View your complete billing history, payment records, and real-time updates from one organized dashboard.
</p>
</div>


<div className="value-card">
<div className="value-icon"><Clock size={40} /></div>
<h3 className="value-heading">24/7 Availability</h3>
<p className="value-text">
Make payments anytime—day or night—with uninterrupted access throughout the entire week.
</p>
</div>
</div>
</section>
  );
};

export default WhyChooseUs;