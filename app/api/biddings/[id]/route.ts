import { createClient } from '@/app/lib/server'
import { NextResponse } from 'next/server'

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const supabase = createClient()
        const { error } = await supabase
            .from('bidding')
            .delete()
            .match({ id: parseInt(params.id) })

        if (error) throw error

        return NextResponse.json({ success: true })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const supabase = createClient()
        const bid = await request.json()

        const { error } = await supabase
            .from('bidding')
            .update(bid)
            .match({ id: parseInt(params.id) })

        if (error) throw error

        return NextResponse.json({ success: true })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
} 