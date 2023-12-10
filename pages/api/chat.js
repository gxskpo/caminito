import menu from '@/public/menu.json';

export default async function chatHandler(req, res) {
    let content_type = req.headers["Content-Type"] ?? req.headers["content-type"] ?? null;

    if (!content_type) {
        res.setHeader('Accept', 'application/json')
        res.status(406).json({
            'message': 'Oops! An error occurred: Invalid Content-Type'
        })
    } else if (content_type !== "application/json") {
        res.setHeader('Accept', 'application/json')
        res.status(406).json({
            'message': 'Oops! An error occurred: Invalid Content-Type'
        })
    } else if(!req.body) {
        res.status(400).json({
            'message': 'Oops! An error occurred: Body is empty'
        })
    } else if (req.body && !req.body.messages) {
        res.status(400).json({
            'message': 'Oops! An error occurred: Missing `messages` field in body'
        })
    } else if (req.body && req.body.messages && !req.body.messages.length > 0) {
        console.log(req.body)
        console.log(req.body.messages)
        res.status(406).json({
            'message': 'Oops! An error occurred: `messages` '
        })
    } else {
        const apiKey = process.env.OPENAI_API_KEY;

        let messages = []
        messages.push(
            {
                'role': 'system',
                'content': `Eres una IA que ayuda en un restaurante, debe recomendar platillos, y ser servicial, no debe responder a preguntas no relacionadas al restaurante, cuando algun usuario solicite una reomendación o información de un platillo deberá responder con 
[item:<item_id>] SIEMPRE, recuerda SIEMPRE dejar un espacio después de que se cierran los corchetes.
MENU a continuación(JSON): ${JSON.stringify(menu)}`
            }
        );

        messages.push(...req.body.messages);
        //wite a script to stream chat completion from chatGPT (https://api.openai.com/v1/chat/completions), and then relay the stream to requester
        // this thing should be able to handle multiple requests at the same time and work with Netifly
        // it should also be able to handle multiple chatGPT instances at the same time
        let response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                'model': 'gpt-3.5-turbo-16k',
                'messages': messages,
                'n': 1,
                'stream': false,
                'max_tokens': 250,
            })
        })

        let data = await response.json();
        res.status(200).json({
            'message': 'Success',
            'data': data
        })
    }
}