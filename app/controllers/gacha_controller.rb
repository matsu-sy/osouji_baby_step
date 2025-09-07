class GachaController < ApplicationController

  def draw
    @task = Task.random_draw

    render json: {
      title: @task.title,
      icon: @task.icon
    }
  end
end
