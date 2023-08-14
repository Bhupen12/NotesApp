<script lang="ts">
	import { onMount } from 'svelte';
	import { IdbWhere } from '@cloudparker/easy-idb';
	import { page } from '$app/stores';
	import { notesStore } from '$lib/local/local.db-services';
	import type { NoteType } from '$lib/local/local-todo-service';
	import { goto } from '$app/navigation';
	

	// console.log('edit page:', JSON.stringify($page.params.id));

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

	async function save() {
		var lastestEdit = new Date().toLocaleString();
		note.lastModified = lastestEdit;
		await notesStore?.update(note);
		goto('./');
	}
	onMount(async () => {
		await getNotes();
	});
</script>

<div class="container mt-3">
	<form action="">
		<input bind:value={note.heading} class="form-control my-1" placeholder="Heading" />
		<textarea bind:value={note.note} cols="30" rows="15" class="form-control my-1" />
		<div class="row mt-3 text-align-center">
			<div class="col">
				<a href="./" class="btn btn-dark"><i class="fa-solid fa-backward fa-xl" /></a>
			</div>
			<div class="col">
				<button class="btn btn-dark fa-xl" on:click={save}>
					<i class="fas fa-save" /> Save
				</button>
			</div>
		</div>
	</form>
</div>

<style>
	input{

	}
	textarea{

	}
	.btn {
		width: 90%;
	}
</style>
