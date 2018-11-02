require 'sinatra'
require_relative 'database_connection'
require 'pry'
require 'json'

DatabaseConnection.setup('thermostat')

get '/' do
  result = DatabaseConnection.query('SELECT * FROM temperatures')[0]
  p result.to_json
  result.to_json
end

post '/temp' do
  DatabaseConnection.query("UPDATE temperatures "\
     "SET temperature = #{params[:temp]}")
end

post '/city' do
  DatabaseConnection.query("UPDATE temperatures "\
     "SET city = '#{params[:city]}'")
end
