from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
# Permite conexiones cruzadas desde tus interfaces locales de Live Server
CORS(app, resources={r"/api/*": {"origins": "*"}})



# Crear la tabla de usuarios registrados
def iniciar_base_datos():
    conexion = sqlite3.connect("usuarios.db")
    cursor = conexion.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            correo TEXT UNIQUE,
            clave TEXT
        )
    """)
    conexion.commit()
    conexion.close()

# Crear la tabla del historial de calculos matemáticos
def iniciar_tabla_calculos():
    conexion = sqlite3.connect("usuarios.db")
    cursor = conexion.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS calculos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tipo_calculo TEXT,
            detalle TEXT
        )
    """)
    conexion.commit()
    conexion.close()



# 1. ACCION: CREAR (Registro de usuarios)
@app.route('/api/registro', methods=['POST'])
def registrar_usuario():
    datos = request.json
    usuario = datos.get('username')
    correo = datos.get('correo')
    clave = datos.get('clave')
    
    try:
        conexion = sqlite3.connect("usuarios.db")
        cursor = conexion.cursor()
        cursor.execute("INSERT INTO usuarios (username, correo, clave) VALUES (?, ?, ?)", (usuario, correo, clave))
        conexion.commit()
        conexion.close()
        return jsonify({"status": "success", "mensaje": "Usuario guardado con exito"}), 201
    except:
        return jsonify({"status": "error", "mensaje": "El correo ya esta registrado"}), 400

# 2. ACCION: LEER / CONSULTAR (Inicio de sesion)
@app.route('/api/login', methods=['POST'])
def iniciar_sesion():
    datos = request.json
    usuario_o_correo = datos.get('usuario')
    clave = datos.get('clave')
    
    conexion = sqlite3.connect("usuarios.db")
    cursor = conexion.cursor()
    cursor.execute("SELECT * FROM usuarios WHERE (username = ? OR correo = ?) AND clave = ?", (usuario_o_correo, usuario_o_correo, clave))
    resultado = cursor.fetchone()
    conexion.close()
    
    if resultado:
        return jsonify({"status": "success", "mensaje": "Acceso concedido"}), 200
    else:
        return jsonify({"status": "error", "mensaje": "Datos incorrectos"}), 401

# 3. ACCION: ACTUALIZAR (Cambiar contraseña en recuperación)
@app.route('/api/recuperar', methods=['POST'])
def recuperar_clave():
    datos = request.json
    correo = datos.get('correo')
    nueva_clave = datos.get('nueva_clave')
    
    conexion = sqlite3.connect("usuarios.db")
    cursor = conexion.cursor()
    
    cursor.execute("SELECT * FROM usuarios WHERE correo = ?", (correo,))
    usuario = cursor.fetchone()
    
    if usuario:
        cursor.execute("UPDATE usuarios SET clave = ? WHERE correo = ?", (nueva_clave, correo))
        conexion.commit()
        conexion.close()
        return jsonify({"status": "success", "mensaje": "Contraseña actualizada"}), 200
    else:
        conexion.close()
        return jsonify({"status": "error", "mensaje": "El correo no esta registrado"}), 404




# C - CREAR: Guardar un calculo nuevo en la base de datos
@app.route('/api/guardar-calculo', methods=['POST'])
def guardar_calculo():
    datos = request.json
    tipo = datos.get('tipo')
    detalle = datos.get('detalle')
    
    conexion = sqlite3.connect("usuarios.db")
    cursor = conexion.cursor()
    cursor.execute("INSERT INTO calculos (tipo_calculo, detalle) VALUES (?, ?)", (tipo, detalle))
    conexion.commit()
    conexion.close()
    return jsonify({"status": "success", "mensaje": "Calculo guardado"}), 201

# D - BORRAR: Eliminar todo el historial completo de calculos
@app.route('/api/borrar-historial', methods=['POST'])
def borrar_historial():
    conexion = sqlite3.connect("usuarios.db")
    cursor = conexion.cursor()
    cursor.execute("DELETE FROM calculos")
    conexion.commit()
    conexion.close()
    return jsonify({"status": "success", "mensaje": "Historial vaciado"}), 200


if __name__ == '__main__':
    iniciar_base_datos()
    iniciar_tabla_calculos()  # Llama a la nueva tabla al arrancar
    app.run(debug=True, port=5000)
