
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, MessageSquare, Sparkles, AlertCircle, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useAI } from '@/hooks/use-ai';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';

interface AIInsightPanelProps {
  initialText?: string;
  showTabs?: boolean;
  activeTab?: 'analyze' | 'recommend';
  userId?: string;
  className?: string;
}

const AIInsightPanel: React.FC<AIInsightPanelProps> = ({ 
  initialText = '', 
  showTabs = true,
  activeTab = 'analyze',
  userId = 'guest-user',
  className = ''
}) => {
  const [text, setText] = useState(initialText);
  const [activeTabState, setActiveTabState] = useState<'analyze' | 'recommend'>(activeTab);
  const { 
    analyzeUserText, 
    isAnalyzingText, 
    textAnalysisResult,
    getUserRecommendations,
    isLoadingRecommendations,
    recommendationsResult,
    resetTextAnalysis,
    resetRecommendations
  } = useAI();

  const handleAnalyze = async () => {
    if (!text.trim()) {
      toast.error('Please enter text to analyze');
      return;
    }
    
    try {
      await analyzeUserText(text);
      toast.success('Text analyzed successfully');
    } catch (error) {
      // Error is handled in the hook
    }
  };

  const handleGetRecommendations = async () => {
    try {
      await getUserRecommendations(userId, {
        recentSearches: [text],
        preferences: { fromInsightPanel: true }
      });
      toast.success('Recommendations generated successfully');
    } catch (error) {
      // Error is handled in the hook
    }
  };

  const renderSentimentBadge = () => {
    if (!textAnalysisResult) return null;
    
    const { sentiment } = textAnalysisResult;
    
    switch (sentiment) {
      case 'positive':
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <ThumbsUp className="w-3 h-3 mr-1" /> Positive
          </Badge>
        );
      case 'negative':
        return (
          <Badge className="bg-red-500 hover:bg-red-600">
            <ThumbsDown className="w-3 h-3 mr-1" /> Negative
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-500 hover:bg-gray-600">
            Neutral
          </Badge>
        );
    }
  };

  const renderContent = () => {
    if (showTabs) {
      return (
        <Tabs value={activeTabState} onValueChange={(v) => setActiveTabState(v as 'analyze' | 'recommend')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="analyze">
              <Brain className="w-4 h-4 mr-2" /> Analyze Text
            </TabsTrigger>
            <TabsTrigger value="recommend">
              <Sparkles className="w-4 h-4 mr-2" /> Get Recommendations
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="analyze">
            {renderAnalyzeContent()}
          </TabsContent>
          
          <TabsContent value="recommend">
            {renderRecommendContent()}
          </TabsContent>
        </Tabs>
      );
    } else {
      // If tabs are not shown, render based on activeTab prop
      return activeTab === 'analyze' ? renderAnalyzeContent() : renderRecommendContent();
    }
  };

  const renderAnalyzeContent = () => (
    <>
      <div className="mb-4">
        <Textarea
          placeholder="Enter text to analyze..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          className="w-full resize-none"
        />
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <Button 
          onClick={handleAnalyze} 
          disabled={isAnalyzingText || !text.trim()} 
          className="bg-meant-600 hover:bg-meant-700"
        >
          <Brain className="w-4 h-4 mr-2" />
          {isAnalyzingText ? 'Analyzing...' : 'Analyze Text'}
        </Button>
        
        {textAnalysisResult && (
          <Button 
            variant="outline" 
            onClick={resetTextAnalysis}
          >
            Clear Results
          </Button>
        )}
      </div>
      
      {isAnalyzingText && (
        <div className="mb-4">
          <Progress value={45} className="w-full h-2" />
          <p className="text-sm text-center mt-1 text-muted-foreground">Processing your text...</p>
        </div>
      )}
      
      {textAnalysisResult && (
        <div className="mt-6 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Sentiment:</span>
              {renderSentimentBadge()}
            </div>
          </div>
          
          <div>
            <span className="text-sm font-medium block mb-2">Key Phrases:</span>
            <div className="flex flex-wrap gap-2">
              {textAnalysisResult.keyPhrases.map((phrase, index) => (
                <Badge key={index} variant="outline" className="bg-meant-50">
                  {phrase}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <span className="text-sm font-medium block mb-2">Topics:</span>
            <div className="flex flex-wrap gap-2">
              {textAnalysisResult.topics.map((topic, index) => (
                <Badge key={index} variant="secondary">
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="pt-2">
            <span className="text-sm font-medium">Confidence Score:</span>
            <Progress 
              value={textAnalysisResult.confidenceScore * 100} 
              className="h-2 mt-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0%</span>
              <span>{Math.round(textAnalysisResult.confidenceScore * 100)}%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      )}
    </>
  );

  const renderRecommendContent = () => (
    <>
      <p className="text-sm text-muted-foreground mb-4">
        Get personalized recommendations based on your needs and preferences.
      </p>
      
      <div className="mb-4">
        <Textarea
          placeholder="Describe what you're looking for..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          className="w-full resize-none"
        />
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <Button 
          onClick={handleGetRecommendations} 
          disabled={isLoadingRecommendations} 
          className="bg-meant-600 hover:bg-meant-700"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          {isLoadingRecommendations ? 'Finding Recommendations...' : 'Get Recommendations'}
        </Button>
        
        {recommendationsResult && (
          <Button 
            variant="outline" 
            onClick={resetRecommendations}
          >
            Clear Results
          </Button>
        )}
      </div>
      
      {isLoadingRecommendations && (
        <div className="mb-4">
          <Progress value={60} className="w-full h-2" />
          <p className="text-sm text-center mt-1 text-muted-foreground">Finding personalized recommendations...</p>
        </div>
      )}
      
      {recommendationsResult && (
        <div className="mt-4 space-y-4">
          <h4 className="font-medium">Recommended for You</h4>
          
          {recommendationsResult.recommendations.map((rec, index) => (
            <Card key={index} className="bg-meant-50 border-meant-100">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="text-sm font-medium">{rec.title}</CardTitle>
                  <Badge
                    variant="outline" 
                    className={
                      rec.type === 'service' ? 'bg-blue-100 text-blue-800' :
                      rec.type === 'product' ? 'bg-green-100 text-green-800' :
                      rec.type === 'activity' ? 'bg-purple-100 text-purple-800' :
                      'bg-orange-100 text-orange-800'
                    }
                  >
                    {rec.type}
                  </Badge>
                </div>
                <CardDescription className="text-xs mt-1">
                  {rec.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    Match: {Math.round(rec.confidence * 100)}%
                  </span>
                  <Button variant="link" size="sm" className="h-auto p-0 text-meant-600">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );

  return (
    <Card className={`border-meant-100 ${className}`}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-meant-600" />
          <CardTitle className="text-lg">AI Insights</CardTitle>
        </div>
        <CardDescription>
          Get AI-powered insights and recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  );
};

export default AIInsightPanel;
