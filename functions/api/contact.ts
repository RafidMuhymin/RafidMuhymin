export async function onRequestPost({ request, env }) {
  const { EmailJSAPIEndpoint, service_id, template_id, user_id } = env;

  const template_params = Object.fromEntries(await request.formData());

  return fetch(EmailJSAPIEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      service_id,
      template_id,
      user_id,
      template_params,
    }),
  })
    .then((res) => res.text())
    .then((res) => new Response(res))
    .catch(
      (error) =>
        new Response(error, {
          status: 400,
        })
    );
}
