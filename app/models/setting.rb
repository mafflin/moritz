class Setting < ApplicationRecord
  belongs_to :user

  def group_colors
    Group::COLORS
  end

  def unmatched_group_id
    Group::UNMATCHED_ID
  end
end
