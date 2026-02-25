import React, { useState, useRef } from 'react';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
import { submitLandownerEnquiryApi } from '../services/landownerService.js';

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
  const navigate = useNavigate();
  const { isRegistered } = useStore();

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
    if (!formData.name || !formData.phone || !formData.location || !formData.area || !formData.model) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append('partnershipOption', formData.model);
      submitData.append('name', formData.name);
      submitData.append('phoneNumber', formData.phone);
      submitData.append('location', formData.location);
      submitData.append('areaSize', formData.area);

      if (formData.email) {
        submitData.append('email', formData.email);
      }

      if (formData.image) {
        submitData.append('images', formData.image);
      }

      await submitLandownerEnquiryApi(submitData);

      toast.success('Your application has been submitted successfully.');
      setFormData({ model: '', location: '', area: '', name: '', phone: '', email: '', image: null });
      if (fileInputRef.current) fileInputRef.current.value = "";
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.msg || error.message || 'Failed to submit application. Please try again.');
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gradient-to-b from-[#f2f7ed] to-white px-4 py-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-8 text-center md:text-left md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl font-black text-[#151d0c] md:text-4xl lg:text-5xl leading-tight">🌱 Partnership Models for Landowners</h2>
            <p className="mt-6 text-lg text-[#4b5f3e] leading-relaxed">
              Ente Bhoomi Agro LLP offers flexible and transparent collaboration models for landowners who wish to make their land productive and profitable.
            </p>
          </div>
          <div className="w-full md:w-5/12 lg:w-1/2 flex justify-center md:justify-end">
            <img
              src="/aerial-view-vibrant-agricultural-landscape-with-diverse-crops.jpg"
              alt="Aerial view of vibrant agricultural landscape"
              className="rounded-2xl shadow-xl object-cover w-full h-[300px] md:h-[400px]"
            />
          </div>
        </div>

        <div className="space-y-4">
          {/* Model 1: Annual Lease */}
          <div className="group relative overflow-hidden flex flex-col items-start justify-end rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] min-h-[400px]">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('/Gemini_Generated_Image_t0dzv8t0dzv8t0dz.png')" }}
            ></div>
            {/* Dark Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#151d0c]/95 via-[#151d0c]/80 to-transparent"></div>

            <div className="relative z-10 p-6 md:p-8 w-full h-full flex flex-col justify-end mt-20">
              <div className="flex items-center gap-4 mb-5">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#5bab00] text-white shadow-lg shadow-[#5bab00]/30">
                  <span className="material-symbols-outlined text-2xl">calendar_month</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white drop-shadow-md leading-tight">Annual Lease or Profit Share Model</h3>
              </div>

              <ul className="text-sm md:text-base text-gray-200 leading-relaxed list-none space-y-2 mb-6 max-w-2xl">
                <li className="flex items-start gap-2.5"><span className="text-[#5bab00] font-black text-lg">✓</span> <span className="pt-0.5">Annual lease amount (mutually agreed)</span></li>
                <li className="flex items-start gap-2.5"><span className="text-[#5bab00] font-black text-lg">✓</span> <span className="pt-0.5">Lease paid yearly</span></li>
                <li className="flex items-start gap-2.5"><span className="text-[#5bab00] font-black text-lg">✓</span> <span className="pt-0.5">All cultivation expenses borne by Ente Bhoomi</span></li>
                <li className="flex items-start gap-2.5"><span className="text-[#5bab00] font-black text-lg">✓</span> <span className="pt-0.5">Farming supervised by agricultural experts</span></li>
                <li className="flex items-start gap-2.5"><span className="text-[#5bab00] font-black text-lg">✓</span> <span className="pt-0.5">Landowner chooses higher of: 25% of net profit, OR Fixed annual lease amount</span></li>
              </ul>

              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pt-6 border-t border-white/20">
                <div className="flex items-center gap-2.5 text-sm md:text-base font-bold text-white bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 w-fit">
                  <span className="material-symbols-outlined text-xl text-[#5bab00]">check_circle</span>
                  Assured income with option for higher returns
                </div>

                <button
                  onClick={() => {
                    if (!isRegistered) {
                      toast.error('Please login to select a partnership model');
                      navigate('/login');
                      return;
                    }
                    setFormData(prev => ({ ...prev, model: "Annual Lease" }));
                    setIsModalOpen(true);
                  }}
                  className="w-full lg:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#5bab00] px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-[#5bab00]/40 transition-all hover:bg-[#4a8a00] hover:scale-105"
                >
                  Select Model
                  <span className="material-symbols-outlined text-xl">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* Model 2: Service Management */}
          <div className="group relative overflow-hidden flex flex-col items-start justify-end rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] min-h-[400px]">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('/landscape-sugar-palm-rice-field.jpg')" }}
            ></div>
            {/* Dark Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#151d0c]/95 via-[#151d0c]/80 to-transparent"></div>

            <div className="relative z-10 p-6 md:p-8 w-full h-full flex flex-col justify-end mt-20">
              <div className="flex items-center gap-4 mb-5">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#5bab00] text-white shadow-lg shadow-[#5bab00]/30">
                  <span className="material-symbols-outlined text-2xl">handshake</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white drop-shadow-md leading-tight">Landowner – Service Management Model</h3>
              </div>

              <ul className="text-sm md:text-base text-gray-200 leading-relaxed list-none space-y-2 mb-6 max-w-2xl">
                <li className="flex items-start gap-2.5"><span className="text-[#5bab00] font-black text-lg">✓</span> <span className="pt-0.5">No lease agreement</span></li>
                <li className="flex items-start gap-2.5"><span className="text-[#5bab00] font-black text-lg">✓</span> <span className="pt-0.5">All cultivation expenses borne by landowner</span></li>
                <li className="flex items-start gap-2.5"><span className="text-[#5bab00] font-black text-lg">✓</span> <span className="pt-0.5">Crop planning to marketing managed by Ente Bhoomi</span></li>
                <li className="flex items-start gap-2.5"><span className="text-[#5bab00] font-black text-lg">✓</span> <span className="pt-0.5">Net profit sharing: 55% to landowner, 45% to Ente Bhoomi</span></li>
              </ul>

              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pt-6 border-t border-white/20">
                <div className="flex items-center gap-2.5 text-sm md:text-base font-bold text-white bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 w-fit">
                  <span className="material-symbols-outlined text-xl text-[#5bab00]">check_circle</span>
                  Higher profit share + Professional management
                </div>

                <button
                  onClick={() => {
                    if (!isRegistered) {
                      toast.error('Please login to select a partnership model');
                      navigate('/login');
                      return;
                    }
                    setFormData(prev => ({ ...prev, model: "Service Management" }));
                    setIsModalOpen(true);
                  }}
                  className="w-full lg:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#5bab00] px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-[#5bab00]/40 transition-all hover:bg-[#4a8a00] hover:scale-105"
                >
                  Select Model
                  <span className="material-symbols-outlined text-xl">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* Model 3: Joint Investment */}
          <div className="group relative overflow-hidden flex flex-col items-start justify-end rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] min-h-[400px]">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('/fields-bali-are-photographed-from-drone.jpg')" }}
            ></div>
            {/* Dark Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#151d0c]/95 via-[#151d0c]/80 to-transparent"></div>

            <div className="relative z-10 p-6 md:p-8 w-full h-full flex flex-col justify-end mt-20">
              <div className="flex items-center gap-4 mb-5">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#5bab00] text-white shadow-lg shadow-[#5bab00]/30">
                  <span className="material-symbols-outlined text-2xl">handshake</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white drop-shadow-md leading-tight">Joint Investment Model</h3>
              </div>

              <ul className="text-sm md:text-base text-gray-200 leading-relaxed list-none space-y-2 mb-6 max-w-2xl">
                <li className="flex items-start gap-2.5"><span className="text-[#5bab00] font-black text-lg">✓</span> <span className="pt-0.5">Cultivation costs invested by landowner</span></li>
                <li className="flex items-start gap-2.5"><span className="text-[#5bab00] font-black text-lg">✓</span> <span className="pt-0.5">Farm management and marketing by Ente Bhoomi</span></li>
                <li className="flex items-start gap-2.5"><span className="text-[#5bab00] font-black text-lg">✓</span> <span className="pt-0.5">After harvest: First: Fixed lease amount paid to landowner</span></li>
                <li className="flex items-start gap-2.5"><span className="text-[#5bab00] font-black text-lg">✓</span> <span className="pt-0.5">Remaining net profit shared: 35% to landowner, 65% to Ente Bhoomi</span></li>
              </ul>

              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pt-6 border-t border-white/20">
                <div className="flex items-center gap-2.5 text-sm md:text-base font-bold text-white bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 w-fit">
                  <span className="material-symbols-outlined text-xl text-[#5bab00]">check_circle</span>
                  Assured base income + Profit sharing
                </div>

                <button
                  onClick={() => {
                    if (!isRegistered) {
                      toast.error('Please login to select a partnership model');
                      navigate('/login');
                      return;
                    }
                    setFormData(prev => ({ ...prev, model: "Joint Investment" }));
                    setIsModalOpen(true);
                  }}
                  className="w-full lg:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#5bab00] px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-[#5bab00]/40 transition-all hover:bg-[#4a8a00] hover:scale-105"
                >
                  Select Model
                  <span className="material-symbols-outlined text-xl">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* Model 4: Pure Profit Sharing */}
          <div className="group relative overflow-hidden flex flex-col items-start justify-end rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] min-h-[400px]">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('/view-green-palm-tree-species-with-beautiful-foliage.jpg')" }}
            ></div>
            {/* Dark Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#151d0c]/95 via-[#151d0c]/80 to-transparent"></div>

            <div className="relative z-10 p-6 md:p-8 w-full h-full flex flex-col justify-end mt-20">
              <div className="flex items-center gap-4 mb-5">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#5bab00] text-white shadow-lg shadow-[#5bab00]/30">
                  <span className="material-symbols-outlined text-2xl">trending_up</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white drop-shadow-md leading-tight">Pure Profit Sharing Model (No Lease)</h3>
              </div>

              <ul className="text-sm md:text-base text-gray-200 leading-relaxed list-none space-y-2 mb-6 max-w-2xl">
                <li className="flex items-start gap-2.5"><span className="text-[#5bab00] font-black text-lg">✓</span> <span className="pt-0.5">No fixed lease payment</span></li>
                <li className="flex items-start gap-2.5"><span className="text-[#5bab00] font-black text-lg">✓</span> <span className="pt-0.5">All cultivation and marketing expenses by landowner</span></li>
                <li className="flex items-start gap-2.5"><span className="text-[#5bab00] font-black text-lg">✓</span> <span className="pt-0.5">Complete execution by Ente Bhoomi</span></li>
                <li className="flex items-start gap-2.5"><span className="text-[#5bab00] font-black text-lg">✓</span> <span className="pt-0.5">Net profit sharing: 65% to landowner, 35% to Ente Bhoomi</span></li>
              </ul>

              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pt-6 border-t border-white/20">
                <div className="flex items-center gap-2.5 text-sm md:text-base font-bold text-white bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 w-fit">
                  <span className="material-symbols-outlined text-xl text-[#5bab00]">check_circle</span>
                  Maximum profit share for landowner
                </div>

                <button
                  onClick={() => {
                    if (!isRegistered) {
                      toast.error('Please login to select a partnership model');
                      navigate('/login');
                      return;
                    }
                    setFormData(prev => ({ ...prev, model: "Pure Profit Sharing" }));
                    setIsModalOpen(true);
                  }}
                  className="w-full lg:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#5bab00] px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-[#5bab00]/40 transition-all hover:bg-[#4a8a00] hover:scale-105"
                >
                  Select Model
                  <span className="material-symbols-outlined text-xl">arrow_forward</span>
                </button>
              </div>
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
