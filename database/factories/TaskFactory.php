<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->sentence(),
            'description' => fake()->realText(),
            'deadline' => fake()->dateTimeBetween('now', '+1 year'),
            'status' => fake()->randomElement(['Pendente', 'Em Andamento', 'Finalizado']),
            'image_path' => fake()->imageUrl(),
            'priority' => fake()->randomElement(['Baixa', 'Média', 'Alta', 'Urgente']),
            'assigned_user_id' => 1,
            'created_by' => 1,
            'updated_by' => 1
        ];
    }
}