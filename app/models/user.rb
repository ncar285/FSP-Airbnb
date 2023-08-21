# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  firstname       :string           not null
#  lastname        :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord

    has_secure_password

    validates :firstname, :lastname, :email, presence: true
    validates :email, 
        uniqueness: true,
        length: { in: 3..255 },
        format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :session_token, presence: true, uniqueness: true
    # validates :username, format: { without: URI::MailTo::EMAIL_REGEXP, message: "can't be an email" }
    validates :password, length: { in: 6..255 }, allow_nil: true


    before_validation :ensure_session_token

  
    has_many :listings,
        foreign_key: :owner_id







    has_one_attached :photo
    # dependent: :destroy

    # has_many :bookings,
    #     dependent: :destroy

    # has_many :reviews,
    #     dependent: :destroy

    # has_many :wishlists,
    #     dependent: :destroy

    # has_many_attatched :photos


    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        if user && user.authenticate(password)
            user 
        else
            nil 
        end
    end

    def reset_session_token! 
        self.session_token = generate_unique_token 
        save! 
        session_token 
    end

    def ensure_session_token 
        self.session_token ||= generate_unique_token
    end

    private 
    def generate_unique_token 
        loop do 
            token = SecureRandom.urlsafe_base64 
            return token unless User.exists?(session_token: token)
        end
    end

    


end
