class GachaController < ApplicationController

  def draw
    @task = Task.random_draw

    render json: {
      title: @task.title.gsub(/\n/, '<br>').gsub('|', '<br>'),
      icon: @task.icon,
      icon_url: view_context.asset_path("icons/#{@task.icon}")
    }
  end
end
