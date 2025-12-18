"use client"

import { useState, useEffect } from "react"
import { Users, Globe, Monitor, Clock, RefreshCw } from "lucide-react"
import { format } from "date-fns"

interface Visitor {
  ip: string
  device: string
  userAgent: string
  timestamp: string
}

export default function SecretPage() {
  const [visitors, setVisitors] = useState<Visitor[]>([])
  const [count, setCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchVisitors = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/visitors?secret=true')
      const data = await response.json()
      if (data.visitors) {
        setVisitors(data.visitors)
        setCount(data.count)
      } else {
        setError('Failed to load visitors')
      }
    } catch (err) {
      setError('Error loading visitors')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchVisitors()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full">
                <Users className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Visitor Analytics
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Secret visitor tracking page
                </p>
              </div>
            </div>
            <button
              onClick={fetchVisitors}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
              <span className="text-sm font-medium">Refresh</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Users className="text-blue-600" size={20} />
                <span className="text-sm font-medium text-blue-700">Total Visits</span>
              </div>
              <p className="text-2xl font-bold text-blue-900">{count.toLocaleString()}</p>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="text-green-600" size={20} />
                <span className="text-sm font-medium text-green-700">Unique IPs</span>
              </div>
              <p className="text-2xl font-bold text-green-900">
                {new Set(visitors.map(v => v.ip)).size}
              </p>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <Monitor className="text-purple-600" size={20} />
                <span className="text-sm font-medium text-purple-700">Devices</span>
              </div>
              <p className="text-2xl font-bold text-purple-900">
                {new Set(visitors.map(v => v.device)).size}
              </p>
            </div>
          </div>
        </div>

        {/* Visitors List */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">All Visitors</h2>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="animate-spin text-gray-400" size={32} />
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">{error}</div>
          ) : visitors.length === 0 ? (
            <div className="text-center py-12 text-gray-400">No visitors yet</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">#</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">IP Address</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Device</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">User Agent</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {visitors.map((visitor, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-4 text-sm text-gray-600">{index + 1}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Globe size={16} className="text-gray-400" />
                          <span className="text-sm font-mono text-gray-800">{visitor.ip}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Monitor size={16} className="text-gray-400" />
                          <span className="text-sm text-gray-700">{visitor.device}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-xs text-gray-500 font-mono max-w-md truncate block">
                          {visitor.userAgent}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {format(new Date(visitor.timestamp), "MMM dd, yyyy HH:mm:ss")}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

