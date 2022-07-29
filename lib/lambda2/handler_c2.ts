export async function handler(event:string,context:string){
  console.log('Stage Name is:+process.env.stage');
  return{
    body:'Hello froma Lambda Function -----------copy 2   sagdyagsdgashdhgsagdsahg',
    statusCode:200
  };
 }