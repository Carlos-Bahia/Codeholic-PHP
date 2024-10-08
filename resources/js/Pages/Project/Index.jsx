import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import {Head, Link, router} from '@inertiajs/react';
import Pagination from "@/Components/Pagination.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";

export default function Index({ auth, projects, queryParams = null}) {
    queryParams = queryParams || {}

    const searchFieldChanged = (name, value) => {
        if(value) {
            queryParams[name] = value
        } else {
            delete queryParams[name]
        }

        router.get(route('project.index'), queryParams);
    }

    const onKeyPress = (name, e) => {
        if(e.key !== "Enter") return;

        searchFieldChanged(name, e.target.value)
    }

    return(
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Projetos
                </h2>
            }
        >
            <Head title="Projetos"/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">

                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead
                                    className="text-xs text-gray-700 text-center uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                <tr className="text-nowrap a">
                                    <th className="px-3 py-3">ID</th>
                                    <th className="px-3 py-3">Imagem</th>
                                    <th className="px-3 py-3">Nome</th>
                                    <th className="px-3 py-3">Status</th>
                                    <th className="px-3 py-3">Data Limite</th>
                                    <th className="px-3 py-3">Criado Por</th>
                                    <th className="px-3 py-3">Ações</th>
                                </tr>
                                </thead>
                                <thead
                                    className="text-xs text-gray-700 text-center uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                <tr className="text-nowrap a">
                                    <th className="px-3 py-3"></th>
                                    <th className="px-3 py-3"></th>
                                    <th className="px-3 py-3">
                                        <TextInput className="w-full"
                                                   defaultValue={queryParams.name}
                                                   placeholder="Nome do Projeto"
                                                   onBlur={e => searchFieldChanged('name', e.target.value)}
                                                   onKeyPress={e => onKeyPress('name', e)}
                                        />
                                    </th>
                                    <th className="px-3 py-3">
                                        <SelectInput className="w-full"
                                                     defaultValue={queryParams.status}
                                                     onChange={(e) => searchFieldChanged("status", e.target.value)}
                                        >
                                            <option value="">Selecione</option>
                                            <option value="Pendente">Pendente</option>
                                            <option value="Em andamento">Em Andamento</option>
                                            <option value="Finalizado">Finalizado</option>
                                        </SelectInput>
                                    </th>
                                    <th className="px-3 py-3"></th>
                                    <th className="px-3 py-3"></th>
                                    <th className="px-3 py-3"></th>
                                </tr>
                                </thead>
                                <tbody>
                                {projects.data.map((project) => (
                                    <tr className="bg-white border-b text-center dark:bg-gray-800 dark:border-gray-700">
                                        <th className="px-3 py-2">{project.id}</th>
                                        <td className="px-3 py-2">
                                            <img src={project.image_path} alt="logo-projeto" className="w-14"/>
                                        </td>
                                        <td className="px-3 py-2">{project.name}</td>

                                        {project.status === "Pendente" && (
                                            <td className="px-3 py-2 text-nowrap">
                                                <span className="px-3 py-2 rounded text-white bg-amber-500">
                                                    Pendente
                                                </span>
                                            </td>
                                        )}
                                        {project.status === "Em Andamento" && (
                                            <td className="px-3 py-2 text-nowrap">
                                                <span className="px-3 py-2 rounded text-white bg-blue-500">
                                                    Em Andamento
                                                </span>
                                            </td>
                                        )}
                                        {project.status === "Finalizado" && (
                                            <td className="px-3 py-2 text-nowrap">
                                                <span className="px-3 py-2 rounded text-white bg-green-500">
                                                    Finalizado
                                                </span>
                                            </td>
                                        )}

                                        <td className="px-3 py-2 text-nowrap">{project.deadline}</td>
                                        <td className="px-3 py-2 text-nowrap">{project.createdBy.name}</td>
                                        <td className="px-3 py-2">
                                            <Link href={route('project.edit', project.id)}
                                                  className="font=medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                                                Editar
                                            </Link>
                                            <Link href={route('project.destroy', project.id)}
                                                  className="font=medium text-red-600 dark:text-red-500 hover:underline mx-1">
                                                Deletar
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                            <Pagination links={projects.meta.links}></Pagination>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
