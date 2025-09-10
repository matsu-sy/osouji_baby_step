class GachaController < ApplicationController
  def draw
    @task = Task.random_draw

    render json: {
      id: @task.id,
      title: @task.title.gsub(/\n/, "<br>").gsub("|", "<br>"),
      icon: @task.icon,
      icon_url: view_context.asset_path("icons/#{@task.icon}")
    }
  end

  def share
  task = Task.find(params[:id])

  tweet_text = "#{task.title.gsub(/[\r\n|]/, '')}を宣言します！ #お掃除ガチャ #お掃除宣言"

  app_url = request.base_url
  tweet_text += " #{app_url}"

  twitter_url = "https://twitter.com/intent/tweet?text=#{CGI.escape(tweet_text)}"

  redirect_to twitter_url, allow_other_host: true
  end
end
