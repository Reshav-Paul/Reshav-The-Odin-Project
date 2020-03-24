class Timer
  #write your code here
  def initialize
    @seconds = 0
    @time_string = "00:00:00"
  end

  def seconds
    @seconds
  end

  def time_string
    @time_string
  end

  def seconds=(seconds)
    @seconds = seconds
    h = seconds / 3600
    m = (seconds - h * 3600) / 60
    s = @seconds - (h * 3600) - (m * 60)

    s_string = s.to_s
    m_string = m.to_s
    h_string = h.to_s
    
    if s < 10
      s_string = "0" + s_string
    end

    if m < 10
      m_string = "0" + m_string
    end

    if h < 10
      h_string = "0" + h_string
    end

    @time_string = [h_string, m_string, s_string].join(':')
  end
end
