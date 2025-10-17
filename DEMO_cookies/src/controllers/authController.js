import bcrypt from "bcrypt";
import pool from "../config/db.js";

// Muestra el formulario de inicio de sesión (GET)
export function showLogin(req, res) {
    res.render("Login", { title: "Iniciar sesión" });
}

// Muestra el formulario de registro (GET)
export function showRegister(req, res) {
    res.render("register", { title: "Crear cuenta" });
}

// Registrar el nuevo usuario (POST)
export async function registro(req, res) {
    // Extraer los campos enviados desde el formulario 
    const { name, email, password } = req.body;

    // Validar los campos
    if (!name || !email || !password) {
        return res.status(400).render("mensaje", {
            title: "Registro",
            mensaje: "Todos los campos son obligatorios"
        });
    }

    try {
        // Verificar si el correo ya existe
        const [row] = await pool.query(
            `SELECT id FROM usuarios_app WHERE email = ?`,
            [email]
        );

        if (row.length > 0) {
            return res.status(400).render("mensaje", {title: "Registro",mensaje: "Este email ya está registrado"});
        }

        // Encriptar la contraseña
        const hash = await bcrypt.hash(password, 10);

        // Insertar el nuevo usuario en la base de datos
        const [result] = await pool.query(
            `INSERT INTO usuarios_app (nombre, email, password_hash) VALUES (?, ?, ?)`,
            [name, email, hash]
        );

        // Autologin: crear cookie firmada con datos del usuario
        const user = { id: result.insertId, name, email };

        res.cookie('auth', JSON.stringify(user), {
            httpOnly: true,
            signed: true,
            maxAge: 1000 * 60 * 5 // 5 minutos
        });

        // Redirigir a ruta protegida
        res.redirect("/");

    } catch (error) {
        console.error(error);
        res.status(500).render("mensaje", {  title: "Error", mensaje: "No se pudo crear la cuenta"});
    }
}

//prcesar el inicio de sesion (POST)
export async function login (req, res) {
    //extraemos los datos del formulario
    const  {email, password} = req.body

    if (!email || !password) {
        return res.status(400).render("mensaje", {title: "Iniciar sesion", message: "Todos los campos son obligatorios"})
    }

    try{
        //buscar el usuario en la BD
        const 
    }
}
