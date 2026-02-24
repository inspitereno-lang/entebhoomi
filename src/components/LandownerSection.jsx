import React, { useState, useRef } from 'react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

export default function LandownerSection() {
  const [formData, setFormData] = useState({
    model: '',
    location: '',
    area: '',
    name: '',
    phone: '',
    email: '',
    image: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.location || !formData.area) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    // Simulate API submission
    setTimeout(() => {
      toast.success('Your application has been submitted successfully.');
      setFormData({ model: '', location: '', area: '', name: '', phone: '', email: '', image: null });
      if (fileInputRef.current) fileInputRef.current.value = "";
      setIsSubmitting(false);
      setIsModalOpen(false);
    }, 1500);
  };

  return (
    <section className="bg-gradient-to-b from-[#f2f7ed] to-white px-4 py-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-4 text-center md:text-left md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="mb-2 block text-sm font-bold uppercase tracking-wider text-[#5bab00]">For Landowners</span>
            <h2 className="text-3xl font-black text-[#151d0c] md:text-4xl lg:text-5xl">🌱 Partnership Models for Landowners - Ente Bhoomi Agro LLP</h2>
            <p className="mt-4 text-lg text-[#4b5f3e]">
              Ente Bhoomi Agro LLP offers flexible and transparent collaboration models for landowners who wish to make their land productive and profitable.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Model 1: Annual Lease */}
          <div className="group relative flex flex-col md:flex-row items-start md:items-center justify-between rounded-xl border border-[#5bab00]/10 bg-white p-6 md:p-8 shadow-sm transition-all hover:border-[#5bab00]/50 hover:shadow-lg hover:bg-[#fafdf7]">
            <div className="flex items-start gap-6 md:gap-8 flex-1">
              <div className="hidden sm:flex size-14 md:size-16 shrink-0 items-center justify-center rounded-xl bg-[#5bab00]/10 text-[#5bab00]">
                <span className="material-symbols-outlined text-3xl md:text-4xl">calendar_month</span>
              </div>
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-3">
                  <div className="flex sm:hidden size-10 shrink-0 items-center justify-center rounded-lg bg-[#5bab00]/10 text-[#5bab00]">
                    <span className="material-symbols-outlined text-xl">calendar_month</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-[#151d0c]">Annual Lease or Profit Share Model</h3>
                </div>
                <ul className="text-sm md:text-base text-[#4b5f3e] leading-relaxed list-disc list-inside space-y-1">
                  <li>Annual lease amount (mutually agreed)</li>
                  <li>Lease paid yearly</li>
                  <li>All cultivation expenses borne by Ente Bhoomi</li>
                  <li>Farming supervised by agricultural experts</li>
                  <li>Landowner chooses higher of: 25% of net profit, OR Fixed annual lease amount</li>
                </ul>
                <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
                  <div className="flex items-center gap-1.5 text-sm font-medium text-[#151d0c] bg-[#eef4e6] px-3 py-1 rounded-full">
                    <span className="material-symbols-outlined text-lg text-[#5bab00]">check_circle</span>
                    Assured income with option for higher returns
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 md:mt-0 w-full md:w-auto shrink-0 md:pl-8">
              <button
                onClick={() => {
                  setFormData(prev => ({ ...prev, model: "Annual Lease" }));
                  setIsModalOpen(true);
                }}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#5bab00]/10 px-6 py-3 text-sm font-bold text-[#5bab00] transition-all hover:bg-[#5bab00] hover:text-white group-hover:scale-105"
              >
                Select Model
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Model 2: Service Management */}
          <div className="group relative flex flex-col md:flex-row items-start md:items-center justify-between rounded-xl border border-[#5bab00]/10 bg-white p-6 md:p-8 shadow-sm transition-all hover:border-[#5bab00]/50 hover:shadow-lg hover:bg-[#fafdf7]">
            <div className="flex items-start gap-6 md:gap-8 flex-1">
              <div className="hidden sm:flex size-14 md:size-16 shrink-0 items-center justify-center rounded-xl bg-[#5bab00]/10 text-[#5bab00]">
                <span className="material-symbols-outlined text-3xl md:text-4xl">manage_accounts</span>
              </div>
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-3">
                  <div className="flex sm:hidden size-10 shrink-0 items-center justify-center rounded-lg bg-[#5bab00]/10 text-[#5bab00]">
                    <span className="material-symbols-outlined text-xl">manage_accounts</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-[#151d0c]">Landowner – Service Management Model</h3>
                </div>
                <ul className="text-sm md:text-base text-[#4b5f3e] leading-relaxed list-disc list-inside space-y-1">
                  <li>No lease agreement</li>
                  <li>All cultivation expenses borne by landowner</li>
                  <li>Crop planning to marketing managed by Ente Bhoomi</li>
                  <li>Net profit sharing: 55% to landowner, 45% to Ente Bhoomi</li>
                </ul>
                <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
                  <div className="flex items-center gap-1.5 text-sm font-medium text-[#151d0c] bg-[#eef4e6] px-3 py-1 rounded-full">
                    <span className="material-symbols-outlined text-lg text-[#5bab00]">check_circle</span>
                    Higher profit share + Professional management
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 md:mt-0 w-full md:w-auto shrink-0 md:pl-8">
              <button
                onClick={() => {
                  setFormData(prev => ({ ...prev, model: "Service Management" }));
                  setIsModalOpen(true);
                }}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#5bab00]/10 px-6 py-3 text-sm font-bold text-[#5bab00] transition-all hover:bg-[#5bab00] hover:text-white group-hover:scale-105"
              >
                Select Model
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Model 3: Joint Investment */}
          <div className="group relative flex flex-col md:flex-row items-start md:items-center justify-between rounded-xl border border-[#5bab00]/10 bg-white p-6 md:p-8 shadow-sm transition-all hover:border-[#5bab00]/50 hover:shadow-lg hover:bg-[#fafdf7]">
            <div className="flex items-start gap-6 md:gap-8 flex-1">
              <div className="hidden sm:flex size-14 md:size-16 shrink-0 items-center justify-center rounded-xl bg-[#5bab00]/10 text-[#5bab00]">
                <span className="material-symbols-outlined text-3xl md:text-4xl">handshake</span>
              </div>
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-3">
                  <div className="flex sm:hidden size-10 shrink-0 items-center justify-center rounded-lg bg-[#5bab00]/10 text-[#5bab00]">
                    <span className="material-symbols-outlined text-xl">handshake</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-[#151d0c]">Joint Investment Model</h3>
                </div>
                <ul className="text-sm md:text-base text-[#4b5f3e] leading-relaxed list-disc list-inside space-y-1">
                  <li>Cultivation costs invested by landowner</li>
                  <li>Farm management and marketing by Ente Bhoomi</li>
                  <li>After harvest: First: Fixed lease amount paid to landowner</li>
                  <li>Remaining net profit shared: 35% to landowner, 65% to Ente Bhoomi</li>
                </ul>
                <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
                  <div className="flex items-center gap-1.5 text-sm font-medium text-[#151d0c] bg-[#eef4e6] px-3 py-1 rounded-full">
                    <span className="material-symbols-outlined text-lg text-[#5bab00]">check_circle</span>
                    Assured base income + Profit sharing
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 md:mt-0 w-full md:w-auto shrink-0 md:pl-8">
              <button
                onClick={() => {
                  setFormData(prev => ({ ...prev, model: "Joint Investment" }));
                  setIsModalOpen(true);
                }}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#5bab00]/10 px-6 py-3 text-sm font-bold text-[#5bab00] transition-all hover:bg-[#5bab00] hover:text-white group-hover:scale-105"
              >
                Select Model
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Model 4: Pure Profit Sharing */}
          <div className="group relative flex flex-col md:flex-row items-start md:items-center justify-between rounded-xl border border-[#5bab00]/10 bg-white p-6 md:p-8 shadow-sm transition-all hover:border-[#5bab00]/50 hover:shadow-lg hover:bg-[#fafdf7]">
            <div className="flex items-start gap-6 md:gap-8 flex-1">
              <div className="hidden sm:flex size-14 md:size-16 shrink-0 items-center justify-center rounded-xl bg-[#5bab00]/10 text-[#5bab00]">
                <span className="material-symbols-outlined text-3xl md:text-4xl">trending_up</span>
              </div>
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-3">
                  <div className="flex sm:hidden size-10 shrink-0 items-center justify-center rounded-lg bg-[#5bab00]/10 text-[#5bab00]">
                    <span className="material-symbols-outlined text-xl">trending_up</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-[#151d0c]">Pure Profit Sharing Model (No Lease)</h3>
                </div>
                <ul className="text-sm md:text-base text-[#4b5f3e] leading-relaxed list-disc list-inside space-y-1">
                  <li>No fixed lease payment</li>
                  <li>All cultivation and marketing expenses by landowner</li>
                  <li>Complete execution by Ente Bhoomi</li>
                  <li>Net profit sharing: 65% to landowner, 35% to Ente Bhoomi</li>
                </ul>
                <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
                  <div className="flex items-center gap-1.5 text-sm font-medium text-[#151d0c] bg-[#eef4e6] px-3 py-1 rounded-full">
                    <span className="material-symbols-outlined text-lg text-[#5bab00]">check_circle</span>
                    Maximum profit share for landowner
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 md:mt-0 w-full md:w-auto shrink-0 md:pl-8">
              <button
                onClick={() => {
                  setFormData(prev => ({ ...prev, model: "Pure Profit Sharing" }));
                  setIsModalOpen(true);
                }}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#5bab00]/10 px-6 py-3 text-sm font-bold text-[#5bab00] transition-all hover:bg-[#5bab00] hover:text-white group-hover:scale-105"
              >
                Select Model
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 pt-[10vh] overflow-y-auto">
            <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl border border-[#eef4e6] my-auto">
              {/* Close button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800 transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
              <form onSubmit={handleSubmit} className="p-8 lg:p-10 mt-2 font-sans">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
                  <div className="space-y-6">
                    <div>
                      <label className="mb-1 block text-sm font-semibold text-[#151d0c]">Full Name *</label>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-lg border border-gray-300 bg-[#fafcf8] px-4 py-2.5 text-[#151d0c] focus:border-[#5bab00] focus:ring-1 focus:ring-[#5bab00]"
                        placeholder="Enter your full name"
                        type="text"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-semibold text-[#151d0c]">Phone Number *</label>
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-lg border border-gray-300 bg-[#fafcf8] px-4 py-2.5 text-[#151d0c] focus:border-[#5bab00] focus:ring-1 focus:ring-[#5bab00]"
                        placeholder="+91 98765 43210"
                        type="tel"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-semibold text-[#151d0c]">Email Address</label>
                      <input
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-gray-300 bg-[#fafcf8] px-4 py-2.5 text-[#151d0c] focus:border-[#5bab00] focus:ring-1 focus:ring-[#5bab00]"
                        placeholder="you@example.com"
                        type="email"
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="mb-1 block text-sm font-semibold text-[#151d0c]">Interested Model *</label>
                      <div className="relative">
                        <select
                          name="model"
                          value={formData.model}
                          onChange={handleInputChange}
                          required
                          className="w-full appearance-none rounded-lg border border-gray-300 bg-[#fafcf8] px-4 py-2.5 text-[#151d0c] focus:border-[#5bab00] focus:ring-1 focus:ring-[#5bab00]"
                        >
                          <option value="" disabled>Select an option...</option>
                          <option value="Annual Lease">Annual Lease</option>
                          <option value="Service Management">Service Management</option>
                          <option value="Joint Investment">Joint Investment</option>
                          <option value="Pure Profit Sharing">Pure Profit Sharing</option>
                          <option value="Not Sure">I'm not sure yet</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                          <span className="material-symbols-outlined">expand_more</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-2/3">
                        <label className="mb-1 block text-sm font-semibold text-[#151d0c]">Land Location *</label>
                        <input
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          required
                          className="w-full rounded-lg border border-gray-300 bg-[#fafcf8] px-4 py-2.5 text-[#151d0c] focus:border-[#5bab00] focus:ring-1 focus:ring-[#5bab00]"
                          placeholder="City/District"
                          type="text"
                        />
                      </div>
                      <div className="w-1/3">
                        <label className="mb-1 block text-sm font-semibold text-[#151d0c]">Area (Acres) *</label>
                        <input
                          name="area"
                          value={formData.area}
                          onChange={handleInputChange}
                          required
                          className="w-full rounded-lg border border-gray-300 bg-[#fafcf8] px-4 py-2.5 text-[#151d0c] focus:border-[#5bab00] focus:ring-1 focus:ring-[#5bab00]"
                          placeholder="0.0"
                          type="number"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-semibold text-[#151d0c]">Land Image (Optional)</label>
                      <div className="flex w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-[#fafcf8] p-4 hover:bg-gray-50 cursor-pointer transition-colors relative">
                        <input
                          type="file"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={handleFileChange}
                          ref={fileInputRef}
                          accept="image/*"
                        />
                        <div className="text-center pointer-events-none">
                          <span className="material-symbols-outlined mx-auto text-3xl text-gray-400">add_photo_alternate</span>
                          <p className="mt-1 text-xs text-gray-500">
                            {formData.image ? `Selected: ${formData.image.name}` : 'Upload a photo of your land'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-[#5bab00] py-3.5 text-base font-bold text-white shadow-md hover:bg-[#4a8a00] transition-colors md:w-auto md:px-12 disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Interest'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
