<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $admins = User::whereIn('rol', ['admin', 'super_admin'])
            ->orderBy('created_at', 'desc')
            ->get();

        $clientes = User::where('rol', 'cliente')
            ->withCount('pedidos')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('SuperAdmin/Usuarios', [
            'admins' => $admins,
            'clientes' => $clientes,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'rol' => 'required|in:admin,cliente',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'rol' => $request->rol,
        ]);

        return redirect()->route('super-admin.usuarios')->with('success', 'Usuario creado correctamente.');
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
            'rol' => 'required|in:admin,cliente',
        ]);

        $user->update($request->only('name', 'email', 'rol'));

        if ($request->filled('password')) {
            $request->validate(['password' => 'string|min:6']);
            $user->update(['password' => Hash::make($request->password)]);
        }

        return redirect()->route('super-admin.usuarios')->with('success', 'Usuario actualizado correctamente.');
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);

        if ($user->isSuperAdmin()) {
            return redirect()->route('super-admin.usuarios')->with('error', 'No puedes eliminar un super administrador.');
        }

        $user->delete();

        return redirect()->route('super-admin.usuarios')->with('success', 'Usuario eliminado correctamente.');
    }
}
