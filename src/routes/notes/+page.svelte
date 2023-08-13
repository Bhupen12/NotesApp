<script lang="ts">
	import { onMount } from 'svelte';
	import type { NoteType } from '$lib/local/local-todo-service';
	import { notesStore } from '$lib/local/local.db-services';
	import { get } from 'svelte/store';

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
					<div class="col-3">
						<button class="btn btn-dark" on:click={saveNotes}
							><i class="fa-solid fa-floppy-disk" /> Save</button
						>
					</div>
					<div class="col-8" />
					<div class="col-1">
						<i class="fa-solid fa-xmark removeTextBox" on:click={addNotes} />
					</div>
				</div>
			</div>
		{:else if noteItems}
			{#each noteItems as note}
				<div class="col-6 col-sm-4">
					<div class="row">
						<div class="col-12">
							<div class="card mt-2">
								<div class="card-body">
									<p class="card-text">
										{truncateWords(note.note, 30)}
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

	<button class="btn btnAdd" on:click={addNotes}>
		<i class="fa-solid fa-circle-plus fa-4x" />
	</button>
</div>

<style>
	.btnAdd {
		position: fixed;
		bottom: 0;
		right: 0;
		margin: 2rem 5rem;
		color: tomato;
	}

	.removeTextBox {
		cursor: pointer;
	}

	.dateModify{
		text-align: right;
		font-size: 0.9rem;
	}
</style>
