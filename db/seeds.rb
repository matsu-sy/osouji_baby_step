# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# categoriesテーブルの初期データ
categories_data = [
  { name: '準備系' },
  { name: '整理系' },
  { name: '行動系' }
]

categories_data.each do |category|
  Category.find_or_create_by(name: category[:name])
end

# カテゴリーをハッシュで管理（方法1）
categories = {
  preparation: Category.find_by(name: '準備系'),
  organization: Category.find_by(name: '整理系'),
  action: Category.find_by(name: '行動系')
}

puts "Categories created"


# 全タスクデータ
require 'csv'

csv_path = Rails.root.join('db/seeds/tasks.csv')

unless File.exist?(csv_path)
  puts "CSV file not found: #{csv_path}"
  exit
end

CSV.foreach(csv_path, headers: true) do |row|
  task_name = row['name'].gsub('|', "\n") # |を改行文字に変換してデータベースに保存
  category = categories[row['category'].to_sym] # シンボルに変換
  if category.nil?
    puts " Category not found: #{row['category']}"
    next
  end

  Task.find_or_create_by(
    title: task_name,
    category: category
  ) do |task|
    task.icon = row['icon']
  end
end

puts "Tasks seeded from CSV!"
