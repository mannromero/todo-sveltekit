import db from '$db/mongo'
export async function POST({ request }) {
  const todoo = db.collection('todolist');

  try {
    let body = await request.json();

    if (!body.text) {
      return new Response(JSON.stringify({ success: false, error: 'Text is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    let todo = {
      text: body.text,
      completed: false
    };

    await todoo.insertOne(todo);
   
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function GET({ request }) {
  const todoo = db.collection('todolist');

  try {
    let todos = await todoo.find().toArray();
    const mappedData = todos.map(dat => ({ 
      text: dat.text, 
      completed: dat.completed, 
      id: dat._id,
      // add any other properties you want to include
    }));
    return new Response(JSON.stringify(mappedData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}







