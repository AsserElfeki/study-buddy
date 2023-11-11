import React from 'react'

export default function ApplyPage({ params }: { params: { id: string } | null }) {
    return (

        <div>
            {params.id}
        </div>
    )
}

