'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const SPECIALTIES = [
    { value: 'All Specialties', label: 'Todas las especialidades' },
    { value: 'Médico', label: 'Médico' },
    { value: 'Psicólogo', label: 'Psicólogo' },
    { value: 'Abogado', label: 'Abogado' },
    { value: 'Consultor', label: 'Consultor' },
    { value: 'Terapeuta', label: 'Terapeuta' },
    { value: 'Nutricionista', label: 'Nutricionista' },
    { value: 'Entrenador Personal', label: 'Entrenador Personal' },
    { value: 'Otro', label: 'Otro' },
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
                    Buscar profesionales
                </Label>
                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg
                            className="h-5 w-5 text-ink-400"
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
                        placeholder="Buscar por nombre…"
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
            </div>

            <div>
                <Label htmlFor="specialty" className="sr-only">
                    Filtrar por especialidad
                </Label>
                <select
                    id="specialty"
                    className="flex h-12 w-full rounded-lg border-2 border-cream-300 bg-cream-50 px-3 py-2 text-sm text-ink-900 transition-all focus:border-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-200"
                    value={selectedSpecialty}
                    onChange={(e) => onSpecialtyChange(e.target.value)}
                >
                    {SPECIALTIES.map((specialty) => (
                        <option key={specialty.value} value={specialty.value}>
                            {specialty.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}
