json.extract! @user, :id, :email,  :firstname, :lastname, :created_at, :updated_at

json.photo_url @user.photo.attached ? url_for(user.photo) :  nil
