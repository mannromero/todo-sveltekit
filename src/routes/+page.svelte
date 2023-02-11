
<script >

// @ts-nocheck

import TodoForm from './TodoForm.svelte';
  
    export let data;
    $: ({datas} = data)

   

    async function updateTodo(id, completed) {
   
    let todo = {completed}
    console.log
  try {
    const response = await fetch(`/api/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
  
    });

    if (!response.ok) {
      throw new Error(`Failed to update todo: ${response.statusText}`);
    }

    const result = await response.json();
    console.log(`Todo updated successfully: ${result}`);
  } catch (error) {
    console.error(`Error updating todo: ${error.message}`);
  }
}



    async function deleteTodo(id) {
  try {
    
    const response = await fetch(`/api/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
  
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    const result = await response.json();
    window.location.href = '/';
    if (!result.success) {
      throw new Error('Unable to delete todo');
    }
  } catch (err) {
    alert(err.message);
  }
}


</script>

<main>

    <h1 class="text-3xl font-bold text-center text-green-800 md:text-3xl">MY SIMPLE TODO APP</h1>
    <TodoForm />
  
    {#each datas as todo}
<li
    class="bg-white flex items-center shadow-sm border border-gray-200 rounded-md my-2 mx-3 py-2 px-4"
>
<input type="checkbox" bind:checked={todo.completed} on:change={()=>updateTodo(todo.id, todo.completed)}
        class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-green-600 checked:border-green-600 focus:outline-none bg-contain mr-2 checked:bg-green-600 checked:border-green-600 focus:outline-none form-checkbox h-5 w-5" />
    
        <span class={`flex-1 text-gray-800 ${todo.completed ? 'line-through' : ''}`}>{todo.text}</span>
   
        <button
            type="button"
            class="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            on:click={() => deleteTodo(todo.id)}>Delete</button
        >
  
</li>
{/each}
</main>

<style>
    .line-through {
    text-decoration: line-through;
  }
</style>
