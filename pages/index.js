import PageLayout from "@/components/layouts/PageLayout"
import { useState } from 'react';
import { useRouter } from "next/router";

export default function Home() {
	const router = useRouter()
	return (
		<PageLayout title="Surprise.Me">
			<div>
				<h2>Surprise.me!</h2>
				<p>Create gift lists for all of your events!</p>
				<ul>
					<li>Birthdays</li>
					<li>Weddings</li>
					<li>Graduations</li>
					<li>Baby Showers</li>
					<li>And more!</li>
				</ul>
				<p>Share a link to your gift list with your friends and family!</p>
				<p>No login required to view lists!</p>
			</div>
		</PageLayout>
	)
}
