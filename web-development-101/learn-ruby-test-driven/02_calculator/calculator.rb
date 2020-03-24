#write your code here
def add(a, b)
    a + b
end

def sum(elements)
    sum = 0
    elements.each{|e| sum = sum + e}
    sum
end

def subtract(a, b)
    a - b
end

def multiply(a, *elements)
    product = 1.0
    for e in elements do
        product = product * e
    end
    product * a
end

def factorial(n)
    f = 1;
    while n > 0
        f = f * n;
        n = n - 1;
    end
    f
end

def power(b, n)
    b ** n
end
