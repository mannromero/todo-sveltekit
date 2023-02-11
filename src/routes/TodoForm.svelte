<script>
var text = "";



async function handleSubmit() {
   
  try {
    const todo = {
      text,
      completed: false
    };
    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    });
    
    if (!response.ok) {
      throw new Error(await response.text());
    }
    const result = await response.json();
    if (result.success) {
      text = '';
   
      window.location.href = '/';
    } else {
      throw new Error('Unable to save todo');
    }
   
  } catch (err) {
    alert(err.message);
    text = '';
  }
}


</script>

<form class="my-6 mx-3" on:submit|preventDefault={handleSubmit}>
    <div class="flex flex-col text-sm mb-2">
        <label for="todo" class="font-bold mb-2 text-gray-800">CREATE TODO:</label>
        <input
            type="text"
            name="todo"
            bind:value={text}
            placeholder="Be productive!!"
            class="appearance-none shadow-sm border border-gray-200 p-2 focus:outline-none focus:border-gray-500 rounded-lg"
        />
    </div>
    <button
        type="submit"
        class="w-full shadow-sm rounded bg-green-500 hover:bg-green-700 text-white py-2 px-4">Add Todo</button
    >
</form>