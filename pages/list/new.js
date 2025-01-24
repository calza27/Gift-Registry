'use client';

import PageLayout from "@/components/layouts/PageLayout"
import ListForm from "@/components/ListForm"
import { useRouter } from "next/router";

const NewList = () => {
    const router = useRouter();
    const redirect = () => {
        router.push('/profile')
    }
    return (
        <PageLayout title="New List" requireAuth={true}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                width: "50%",
                marginLeft: "auto",
                marginRight: "auto",
            }}>
                <ListForm successAction={redirect}/>
            </div>
        </PageLayout>
    );
};

export default NewList;