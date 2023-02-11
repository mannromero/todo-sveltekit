// @ts-nocheck
import db from '$db/mongo'
import { ObjectId } from 'mongodb';

export async function DELETE({ params, fetch }) {
  const todoo = db.collection('todolist');

  try {
    let id = params;
   

    if (!id) {
      return new Response(JSON.stringify({ success: false, error: 'Id is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

  
    let one = await todoo.deleteOne(id.text);
   // console.log('one' , one)
  
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


export async function PUT({ params, request }) {
  const todoo = db.collection('todolist');
  let id = params; // fixed, params should be an object with an id property

  
  try {
    let body = await request.json();
    if (!body.completed) {
      return new Response(JSON.stringify({ success: false, error: 'Completed status is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    
  
    const objectId = new ObjectId(id);
    

  
    let result = await todoo.updateMany({ _id: objectId }, { $set: { completed: body } });
    // fixed, update the completed property
    
    if (result.modifiedCount === 0) {
      return new Response(JSON.stringify({ success: false, error: 'Todo not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: 'An error occurred' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
