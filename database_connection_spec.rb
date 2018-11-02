require_relative 'database_connection'

describe DatabaseConnection do
  describe '.setup' do
    it 'sets up connection to database using PG' do
      expect(PG).to receive(:connect).with(dbname: 'test')
      DatabaseConnection.setup('test')
    end
  end

  describe '.query' do
    it 'executes SQL query on connection' do
      DatabaseConnection.setup('thermostat')
      expect(DatabaseConnection.connection).to receive(:exec).with("sql string")
      DatabaseConnection.query("sql string")
    end
  end
end
