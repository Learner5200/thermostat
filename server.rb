require 'sinatra'
require_relative 'database_connection'

DatabaseConnection.setup('thermostat')

get '/' do
  result = DatabaseConnection.query('SELECT * FROM temperatures')
  result.first["temperature"]
end

post '/' do
  query = "UPDATE temperatures SET temperature = #{params[:temp]}"
  DatabaseConnection.query(query)
end
