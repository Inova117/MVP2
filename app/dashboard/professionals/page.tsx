'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { ProfessionalCard } from '@/components/client/professional-card'
import { ProfessionalSearch } from '@/components/client/professional-search'
import type { Profile } from '@/lib/mock-db/types'

export default function ProfessionalsPage() {
    const [professionals, setProfessionals] = useState<Profile[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties')
    const supabase = createClient()

    useEffect(() => {
        const fetchProfessionals = async () => {
            // Fetch all professionals
            const { data: prosData } = await supabase
                .from('profiles')
                .select('*')
                .eq('role', 'professional')
                .execute()

            // Handle API response - it returns the array directly
            if (prosData) {
                if (Array.isArray(prosData)) {
                    setProfessionals(prosData)
                } else if (typeof prosData === 'object' && 'data' in prosData) {
                    // Handle nested data format
                    setProfessionals((prosData as { data: Profile[] }).data || [])
                }
            }
            setLoading(false)
        }

        fetchProfessionals()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) // Only run once on mount

    const filteredProfessionals = professionals.filter((pro) => {
        const matchesSearch = pro.full_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())

        const matchesSpecialty =
            selectedSpecialty === 'All Specialties' ||
            pro.specialty === selectedSpecialty

        return matchesSearch && matchesSpecialty
    })

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-500 border-r-transparent"></div>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                        Loading professionals...
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Find a Professional
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Book appointments with top professionals in various fields
                </p>
            </div>

            <ProfessionalSearch
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedSpecialty={selectedSpecialty}
                onSpecialtyChange={setSelectedSpecialty}
            />

            {filteredProfessionals.length === 0 ? (
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-12 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-3xl">
                        🔍
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                        No professionals found
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Try adjusting your search or filters to find what you&apos;re looking for.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredProfessionals.map((pro) => (
                        <ProfessionalCard key={pro.id} professional={pro} />
                    ))}
                </div>
            )}
        </div>
    )
}
