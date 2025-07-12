import SignIn from "@/components/sign-in";
import { Zap, GitBranch, Package } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="font-bold text-3xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Flowkit
        </div>
        <SignIn label="Signin" />
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center space-y-8">
          {/* Main Headline */}
          <div className="space-y-6">
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                Automate with Agents.
              </span>
              <br />
              <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Orchestrate Workflows.
              </span>
              <br />
              <span className="text-gray-700">All in One Kit.</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Transform your business processes with intelligent automation.
              Build, deploy, and manage AI-powered workflows that scale with
              your needs.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <SignIn label="Get Started Free" />
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 group hover:-translate-y-2">
            <div className="bg-gradient-to-r from-gray-800 to-gray-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              AI Automation
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Leverage cutting-edge AI agents to automate complex tasks and
              decision-making processes with unprecedented intelligence.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 group hover:-translate-y-2">
            <div className="bg-gradient-to-r from-gray-700 to-gray-500 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <GitBranch className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Workflow Orchestration
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Design and manage complex workflows with visual tools that make
              automation accessible to everyone in your organization.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 group hover:-translate-y-2">
            <div className="bg-gradient-to-r from-gray-600 to-gray-400 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Package className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              All-in-One Platform
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Everything you need in one integrated platform - from development
              and testing to deployment and monitoring.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-700 bg-clip-text text-transparent">
              10k+
            </div>
            <div className="text-gray-600 mt-2">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent">
              1M+
            </div>
            <div className="text-gray-600 mt-2">Workflows Run</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-gray-600 to-gray-500 bg-clip-text text-transparent">
              99.9%
            </div>
            <div className="text-gray-600 mt-2">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-gray-500 to-gray-400 bg-clip-text text-transparent">
              24/7
            </div>
            <div className="text-gray-600 mt-2">Support</div>
          </div>
        </div>
      </div>
    </div>
  );
}
