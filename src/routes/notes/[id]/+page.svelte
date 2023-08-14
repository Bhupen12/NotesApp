<script lang="ts">
	import { onMount } from 'svelte';
	import { IdbWhere } from '@cloudparker/easy-idb';
	import { page } from '$app/stores';
	import { notesStore } from '$lib/local/local.db-services';
	import type { NoteType } from '$lib/local/local-todo-service';
	import { goto } from '$app/navigation';

	// console.log('page:', JSON.stringify($page.params.id));

	export let id = $page.params.id;
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

	async function deleteNote() {
		if (notesStore) {
			if (note && note._id) {
				await notesStore.remove(note._id);
				goto('../notes');
			}
		}
	}
	onMount(async () => {
		await getNotes();
	});
</script>

<div class="container mt-3">
	<div class="d-flex">
		<div><h1>{note?._id}. {note?.heading ? note.heading : ''}</h1></div>
	</div>
	<hr />
	<div class="box">
		<p class="pb-5">{note?.note}</p>
	</div>
	<div class="container mb-5 row stickToButtom">
		<div class="col d-flex justify-content-center">
			<a href="../notes" class="btn btn-dark">
				<i class="fa-solid fa-backward fa-xl p-3" />
			</a>
		</div>
		<div class="col d-flex justify-content-center">
			<a href="./{note._id}/edit" class="btn btn-dark">
				<i class="fa-solid fa-pen-to-square fa-xl p-3" /> Edit
			</a>
		</div>
		<div class="col d-flex justify-content-center">
			<button on:click={deleteNote} class="btn btn-dark"
				><i class="fa-solid fa-trash fa-xl p-3" /> Delete</button
			>
		</div>
	</div>
</div>

<style>
	.box {
		padding: 1rem;
		max-height: 60vh;
		overflow-y: auto;
		scrollbar-color: #6969dd #e0e0e0;
		scrollbar-width: thin;
	}

	p {
		text-align: justify;
	}

	.stickToButtom {
		position: fixed;
		bottom: 0;
	}
</style>
