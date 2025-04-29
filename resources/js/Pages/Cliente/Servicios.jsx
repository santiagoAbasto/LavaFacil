import { Head } from '@inertiajs/react';

export default function Servicios({ servicios }) {
    return (
        <>
            <Head title="Servicios disponibles" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Servicios Disponibles</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {servicios.map((servicio) => (
                        <div key={servicio.id} className="p-4 border rounded shadow">
                            <h2 className="text-lg font-semibold">{servicio.nombre}</h2>
                            <p className="text-sm">Precio: Bs {servicio.precio}</p>
                            <p className="text-sm">Requiere peso: {servicio.requiere_peso ? 'Sí' : 'No'}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
