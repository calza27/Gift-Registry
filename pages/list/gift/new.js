'use client';

import PageLayout from "@/components/layouts/PageLayout"
import GiftForm from "@/components/GiftForm"
import { useRouter } from "next/router";
import { useSearchParams } from 'next/navigation'

const NewGift = () => {
    const searchParams = useSearchParams()
    const list_id = searchParams.get('list_id')
    const router = useRouter();
    const redirect = () => {
        router.push('/list?list_id=' + list_id)
    }
    return (
        <PageLayout title="Add Gift" requireAuth={true}>
            <GiftForm listId={list_id} successAction={redirect}/>
        </PageLayout>
    );
};

export default NewGift;