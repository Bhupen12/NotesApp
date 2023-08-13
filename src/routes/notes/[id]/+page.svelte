<script lang="ts">
	import { onMount } from 'svelte';
	import { IdbWhere } from '@cloudparker/easy-idb';
	import { page } from '$app/stores';
	import { notesStore } from '$lib/local/local.db-services';
	import type { NoteType } from '$lib/local/local-todo-service';

	console.log('page:', JSON.stringify($page.params.id));

	let id = $page.params.id;
	let note: NoteType = {};
	let noteItems: NoteType[] | undefined = [];

	async function getNotes() {
		// note = await notesStore?.get({ where: IdbWhere('_id', '==', 1) });
		noteItems = await notesStore?.getAll();

		if (noteItems)
			for (let i = 0; i < noteItems.length; i++) {
				if (noteItems[i]._id == id) {
					note = noteItems[i];
					break;
				}
			}
	}
	onMount(async () => {
		await getNotes();
	});
</script>

<div class="container mt-3 mb-5">
	<div class="d-flex">
		<div><h1>{note?._id}. {note?.heading ? note.heading : ''}</h1></div>
	</div>
	<hr />
	<p>{note?.note}</p>
	<div class="row">
		<div class="col mx-2">
			<a href="../notes" class="btn btn-dark px-5">
				<i class="fa-solid fa-backward fa-xl p-3" />
			</a>
		</div>
		<div class="col">
			<button class="btn btn-dark px-5"><i class="fa-solid fa-pen-to-square fa-xl p-3"></i> Edit</button>
		</div>
		<div class="col">
			<button class="btn btn-dark px-5"><i class="fa-solid fa-trash fa-xl p-3" /> Delete</button>
		</div>
	</div>
</div>

<style>
	p {
		text-align: justify;
	}
</style>
