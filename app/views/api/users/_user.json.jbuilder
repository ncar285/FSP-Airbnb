json.extract! json.extract! user, :id, :email,  :firstname, :lastname

json.photo_url user.photo.attached? ? url_for(user.photo) :  nil
