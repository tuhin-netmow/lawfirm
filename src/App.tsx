
import { Link } from "react-router";
import { useAuthUserQuery } from "./store/features/auth/authApiService";
import {
  Loader,
  Scale,
  Gavel,
  FileText,
  Landmark,
  ShieldCheck
} from "lucide-react";
import { useGetSettingsInfoQuery } from "./store/features/admin/settingsApiService";
import { useAppSettings } from "./hooks/useAppSettings";
import { useAppSelector } from "./store/store";
import AIAssistant from "./components/ai-assistant/AIAssistant";



const APP = () => {
  const token = useAppSelector((state) => state.auth.token);
  const { data: user, isLoading } = useAuthUserQuery(undefined, {
    skip: !token,
  });

  const { data: settings } = useGetSettingsInfoQuery();
  const isLoggedIn = user?.data?.user?.email;

  useAppSettings(settings?.data);

  console.log("App.tsx rendering - AIAssistant should be visible");

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-32 px-6 bg-slate-900 text-white relative overflow-hidden">
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600 blur-[120px]"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600 blur-[120px]"></div>
        </div>

        <div className="z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
            Next-Gen <span className="text-blue-400">Legal Practice</span> Management
          </h1>
          <p className="text-lg md:text-xl mb-10 text-slate-300 max-w-2xl mx-auto leading-relaxed">
            The comprehensive ERP solution designed for modern law firms. Streamline case management, automate documents, and master your billing with ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isLoading ? (
              <div className="px-8 py-3 text-white"><Loader className="animate-spin" /></div>
            ) : isLoggedIn ? (
              <Link
                to="/dashboard"
                className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-500 transition-all duration-200 flex items-center justify-center gap-2"
              >
                Go to Dashboard <Scale className="w-5 h-5" />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-8 py-4 bg-white text-slate-900 font-bold rounded-lg shadow-lg hover:bg-slate-100 transition-all duration-200"
                >
                  Partner Sign In
                </Link>
                <Link
                  to="/portal/login"
                  className="px-8 py-4 bg-transparent border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-200"
                >
                  Client Portal
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-slate-900">
          Empower Your Legal Practice
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Feature 1 */}
          <div className="bg-slate-50 rounded-2xl p-8 hover:-translate-y-1 transition duration-300 border border-slate-100 group">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
              <Gavel className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-slate-900">Case Management</h3>
            <p className="text-slate-600 leading-relaxed">Track every detail of your cases, from intake to resolution, in one centralized and secure hub.</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-slate-50 rounded-2xl p-8 hover:-translate-y-1 transition duration-300 border border-slate-100 group">
            <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors duration-300">
              <FileText className="w-7 h-7 text-indigo-600 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-slate-900">Document Automation</h3>
            <p className="text-slate-600 leading-relaxed">Generate, store, and organize legal documents with powerful version control and smart templates.</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-slate-50 rounded-2xl p-8 hover:-translate-y-1 transition duration-300 border border-slate-100 group">
            <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors duration-300">
              <Landmark className="w-7 h-7 text-emerald-600 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-slate-900">Trust & Billing</h3>
            <p className="text-slate-600 leading-relaxed">Simplifies trust accounting, time tracking, and invoicing to ensure compliance and profitability.</p>
          </div>

          {/* Feature 4 */}
          <div className="bg-slate-50 rounded-2xl p-8 hover:-translate-y-1 transition duration-300 border border-slate-100 group">
            <div className="w-14 h-14 bg-rose-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-rose-600 transition-colors duration-300">
              <ShieldCheck className="w-7 h-7 text-rose-600 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-slate-900">Secure & Compliant</h3>
            <p className="text-slate-600 leading-relaxed">Enterprise-grade security to protect sensitive client data and maintain attorney-client privilege.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 mt-auto border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-white font-bold text-lg mb-2 flex items-center gap-2">
              <Scale className="w-5 h-5 text-blue-500" /> LawFirm ERP
            </span>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} LawFirm Solutions Inc. All rights reserved.
            </p>
          </div>
          <div className="flex gap-8 text-sm font-medium">
            <a href="/privacy" className="hover:text-white transition">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition">Terms of Service</a>
            <a href="/contact" className="hover:text-white transition">Contact Support</a>
          </div>
        </div>
      </footer>

      {/* AI Assistant Chatbox */}
      <AIAssistant />
    </div>
  );
};

export default APP;
