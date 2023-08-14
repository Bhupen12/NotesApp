<script lang="ts">
	import { onMount } from 'svelte';
	import type { NoteType } from '$lib/local/local-todo-service';
	import { notesStore } from '$lib/local/local.db-services';
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';

	let note: NoteType = {};
	let noteItems: NoteType[] | undefined = [];

	async function getNotes() {
		noteItems = await notesStore?.getAll();
		if (noteItems) noteItems.reverse();
	}

	let openTextBox = false;
	function addNotes() {
		openTextBox = !openTextBox;
	}

	let newNotes = '';
	function saveNotes() {
		note.note = newNotes;
		var lastestEdit = new Date().toLocaleString();
		note.lastModified = lastestEdit;
		notesStore?.insert(note);

		openTextBox = false;
		newNotes = '';

		getNotes();
	}

	onMount(async () => {
		await getNotes();
	});

	function truncateWords(str: string | undefined, numWords: number) {
		return str?.split(' ').splice(0, numWords).join(' ');
	}
</script>

<div class="container">
	<hr />

	<div class="row">
		<div class="col-12">
			<h1 class="text-center">Notes</h1>
		</div>
	</div>
	<div class="row">
		{#if openTextBox}
			<div class="row">
				<div class="col-12">
					<textarea class="form-control" bind:value={newNotes} rows="10" />
				</div>
				<div class="row mt-3">
					<div class="col-6">
						<button class="btn btn-dark" on:click={saveNotes}
							><i class="fa-solid fa-floppy-disk fa-xl" />&nbsp Save</button
						>
					</div>
					<div class="col-4" />
					<div class="col-2 d-flex justify-content-end">
						<a on:click={addNotes}><i class="fa-solid fa-xmark fa-2xl removeTextBox" /></a>
					</div>
				</div>
			</div>
		{:else if noteItems}
			<div class="col-lg-4 col-md-6 col-sm-12 mb-2 d-flex justify-content-center">
				<button class="btn btn-lg btnAdd" on:click={addNotes}>
					<i class="fa-solid fa-circle-plus fa-4x" />
				</button>
			</div>

			{#each noteItems as note}
				<div class="col-lg-4 col-md-6 col-sm-12 mb-2">
					<div class="row">
						<div class="col-12">
							<div class="card mt-2 pt-3 px-3 bg-light">
								<div class="card-body">
									<p class="card-text">
										{truncateWords(note.note, 20)}
										<a href="notes/{note._id}">...Read More</a>
									</p>
									<hr />
									<p class="text-muted col-12 dateModify">Last Modified: {note.lastModified}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			{/each}
		{:else}
			<p class="card-text">No Notes</p>
		{/if}
	</div>

	<!-- <button class="btn btn-lg btnAdd" on:click={addNotes}>
		<i class="fa-solid fa-circle-plus fa-4x" />
	</button> -->
</div>

<style>
	.btnAdd {
		/* position: fixed;
		bottom: 0;
		right: 0;
		margin: 2rem 5rem; */
		color: tomato;
	}

	.removeTextBox {
		cursor: pointer;
	}

	.card {
		text-align: justify;
		border-radius: 4px;
		background: #fff;
		box-shadow: 0 6px 10px rgba(0, 0, 0, 0.08), 0 0 6px rgba(0, 0, 0, 0.05);
		transition: 0.3s transform cubic-bezier(0.155, 1.105, 0.295, 1.12), 0.3s box-shadow,
			0.3s -webkit-transform cubic-bezier(0.155, 1.105, 0.295, 1.12);
		padding: 14px 80px 18px 36px;
	}

	.card-text {
		font-size: 1.1rem;
		height: 9rem;
	}

	.card:hover {
		transform: scale(1.05);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
	}

	.dateModify {
		text-align: right;
		font-size: 0.9rem;
		height: 0.1rem;
	}
</style>
