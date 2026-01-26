'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const SPECIALTIES = [
    'All Specialties',
    'Médico',
    'Psicólogo',
    'Abogado',
    'Consultor',
    'Terapeuta',
    'Nutricionista',
    'Entrenador Personal',
    'Otro',
]

interface ProfessionalSearchProps {
    searchTerm: string
    onSearchChange: (value: string) => void
    selectedSpecialty: string
    onSpecialtyChange: (value: string) => void
}

export function ProfessionalSearch({
    searchTerm,
    onSearchChange,
    selectedSpecialty,
    onSpecialtyChange,
}: ProfessionalSearchProps) {
    return (
        <div className="grid gap-4 md:grid-cols-[1fr_200px]">
            <div>
                <Label htmlFor="search" className="sr-only">
                    Search Professionals
                </Label>
                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                    <Input
                        id="search"
                        placeholder="Search by name..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
            </div>

            <div>
                <Label htmlFor="specialty" className="sr-only">
                    Filter by Specialty
                </Label>
                <select
                    id="specialty"
                    className="flex h-10 w-full rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white transition-all focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100 dark:focus:ring-primary-900/30"
                    value={selectedSpecialty}
                    onChange={(e) => onSpecialtyChange(e.target.value)}
                >
                    {SPECIALTIES.map((specialty) => (
                        <option key={specialty} value={specialty}>
                            {specialty}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}
