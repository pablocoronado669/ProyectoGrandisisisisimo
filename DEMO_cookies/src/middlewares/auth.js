export function requireAuth(req, res, next){
    // const raw = req.signedCookies?.auth

    // //hace lo mismo
    // if (req.signedCookies){
    //     valor = req.signedCookies.auth
    // }
    // else
    // {
    //     valor = undefined
    // }

    //si no hay una cookie, significa que el usuario NO ha iniciado sesion
    // se redirige a /login y se le oasa el parametro ?next= para recordar la ruta original a la que intentaba acceder
    if (!raw)
    {
        return res.redirect('login?next=' + encodeURIComponent(req.originalURL))

        // ?next=

        // encodeURIComponent

    }

    let user = JSON.parse(raw)
    "" dha
}