class Task < ApplicationRecord
  belongs_to :category

  def self.random_draw
    order("RAND()").first
  end
end
